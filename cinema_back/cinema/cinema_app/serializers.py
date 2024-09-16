from datetime import timedelta

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Room, Movie, Schedule, Booking


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster_url', 'duration']


class ScheduleSerializer(serializers.ModelSerializer):
    room = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all())
    movie = MovieSerializer()

    class Meta:
        model = Schedule
        fields = ['id', 'room', 'movie', 'showtime', 'status']

    def validate(self, data):
        room = data['room']
        movie = data['movie']
        showtime = data['showtime']

        duration = movie.duration
        if duration is None:
            raise serializers.ValidationError("Movie duration must be provided.")

        end_time = showtime + timedelta(minutes=duration)
        conflicting_schedules = Schedule.objects.filter(
            room=room,
            status__in=["scheduled", "in_progress"]
        ).exclude(id=self.instance.id if self.instance else None)
        for schedule in conflicting_schedules:
            existing_showtime = schedule.showtime
            existing_end_time = existing_showtime + timedelta(minutes=schedule.movie.duration)
            if not (end_time <= existing_showtime or showtime >= existing_end_time):
                raise serializers.ValidationError(
                    "Another movie is already scheduled in this room during the selected time."
                )

        return data


class SeatSerializer(serializers.Serializer):
    row = serializers.IntegerField()
    column = serializers.IntegerField()
    available = serializers.BooleanField()


class ScheduleDetailSerializer(serializers.ModelSerializer):
    movie = MovieSerializer()
    seats = serializers.SerializerMethodField()

    class Meta:
        model = Schedule
        fields = ['id', 'movie', 'showtime', 'status', 'seats']

    def get_seats(self, obj):
        room = obj.room
        bookings = Booking.objects.filter(schedule=obj)

        seats = []
        for row in range(1, room.seats_row + 1):
            for column in range(1, room.seats_column + 1):
                is_booked = bookings.filter(row=row, column=column).exists()
                seats.append({
                    'row': row,
                    'column': column,
                    'available': not is_booked
                })
        return seats


class RoomSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ['id', 'name', 'seats_row', 'seats_column', 'schedules']


class BookingSerializer(serializers.ModelSerializer):
    schedule = serializers.StringRelatedField()
    user = UserSerializer()

    class Meta:
        model = Booking
        fields = ['id', 'row', 'column', 'schedule', 'user']
