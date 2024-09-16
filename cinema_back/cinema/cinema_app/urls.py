from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RoomViewSet, MovieViewSet, ScheduleViewSet, BookingViewSet, RegisterView, LogoutView, \
    ScheduleDetailViewSet

router = DefaultRouter()
router.register(r'rooms', RoomViewSet)
router.register(r'movies', MovieViewSet)
router.register(r'schedules', ScheduleViewSet)
router.register(r'schedule-details', ScheduleDetailViewSet, basename='schedule-detail')
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),  # User registration
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT token refresh
    path('logout/', LogoutView.as_view(), name='logout'),
]
