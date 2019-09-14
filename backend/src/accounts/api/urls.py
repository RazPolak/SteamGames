

from django.urls import path

from .views import UserListView, UserCreateView, UserDetailView, UserFavoriteView, UserFavoriteCreateView, UserFavoriteRemoveView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [
    path('', UserListView.as_view()),
    path('register/', UserCreateView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/token-verify/', TokenVerifyView.as_view()),
    path('favorites/', UserFavoriteView.as_view()),
    path('favorites/add/', UserFavoriteCreateView.as_view()),
    path('favorites/remove/', UserFavoriteRemoveView.as_view()),



]
