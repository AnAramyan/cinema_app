from rest_framework import viewsets, filters, generics
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Room, Movie, Schedule, Booking
from .serializers import RoomSerializer, MovieSerializer, ScheduleSerializer, BookingSerializer, RegisterSerializer, \
    ScheduleDetailSerializer
from rest_framework import status
from rest_framework.exceptions import ValidationError


class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user and (request.user.is_staff or request.user.is_superuser)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": {
                "username": user.username,
                "email": user.email,
            },
            "message": "User created successfully"
        }, status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        queryset = super().get_queryset()
        min_seats = self.request.query_params.get('min_seats')
        if min_seats:
            queryset = queryset.filter(seats_row__gte=min_seats)
        return queryset


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['title', 'duration']
    permission_classes = [IsAuthenticated, IsAdminUser]


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset


class ScheduleDetailViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(id=self.kwargs.get('pk'))


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        schedule_id = request.data.get('scheduleId')
        row = request.data.get('row')
        column = request.data.get('column')
        user = request.user

        try:
            schedule = Schedule.objects.get(id=schedule_id)
        except Schedule.DoesNotExist:
            raise ValidationError({"error": "Schedule does not exist."})

        room = schedule.room
        if row < 1 or row > room.seats_row or column < 1 or column > room.seats_column:
            return Response(
                {"error": "Row or column is out of bounds for the selected room."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if Booking.objects.filter(schedule=schedule, row=row, column=column).exists():
            return Response({"error": "This seat is already booked."}, status=status.HTTP_400_BAD_REQUEST)

        booking = Booking.objects.create(
            schedule=schedule,
            row=row,
            column=column,
            user=user
        )
        serializer = self.get_serializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
