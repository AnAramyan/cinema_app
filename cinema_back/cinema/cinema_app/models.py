from datetime import timedelta

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models


class Room(models.Model):
    name = models.CharField(max_length=100)
    seats_row = models.IntegerField()
    seats_column = models.IntegerField()

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=200)
    poster_url = models.URLField()
    duration = models.IntegerField()

    def __str__(self):
        return self.title


class Schedule(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('in_progress', 'In Progress'),
        ('finished', 'Finished'),
        ('canceled', 'Canceled'),
    ]
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='schedules')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='schedules')
    showtime = models.DateTimeField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='scheduled',
    )

    def __str__(self):
        return f"{self.movie.title} in {self.room.name} at {self.showtime}"

    def clean(self):
        duration = self.movie.duration
        if duration is None:
            raise ValidationError('Movie duration must be provided.')
        end_time = self.showtime + timedelta(minutes=duration)
        conflicting_schedules = Schedule.objects.filter(
            room=self.room,
            status__in=["scheduled", "in_progress"]
        ).exclude(id=self.id)
        for schedule in conflicting_schedules:
            existing_showtime = schedule.showtime
            existing_end_time = existing_showtime + timedelta(minutes=schedule.movie.duration)
            if not (end_time <= existing_showtime or self.showtime >= existing_end_time):
                raise ValidationError(
                    "Another movie is already scheduled in this room during the selected time."
                )

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Booking(models.Model):
    row = models.IntegerField()
    column = models.IntegerField()
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')

    def __str__(self):
        return f"Row {self.row}, Column {self.column} for {self.schedule} by {self.user.username}"
