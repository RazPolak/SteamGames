from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication


from games.models import Game
from .serializers import UserProfileSerializer, UserCreateSerializer, UserFavoriteSerializer, UserFavoriteCreateSerializer


User = get_user_model()


class UserListView(ListAPIView):
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        # check if None, if true give all objects. Else give the specific object
        parameters = self.request.query_params
        if(parameters):
            username = parameters.get('username')
            password = parameters.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                return username
            else:
                print('something went wrong')
                return False

        queryset = User.objects.all()
        return queryset


class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer


class UserCreateView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()


class UserFavoriteView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserFavoriteSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Game.objects.filter(users__username=user)
        return queryset


class UserFavoriteCreateView(CreateAPIView):
    serializer_class = UserFavoriteCreateSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        queryset = Game.objects.filter(users__username=user)

    def perform_create(self, serializer_class):
        user = self.request.user
        title = self.request.data.get('title')
        game = Game.objects.get(title=title)
        game.users.add(user)
        return game


class UserFavoriteRemoveView(CreateAPIView):
    serializer_class = UserFavoriteCreateSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer_class):
        user = self.request.user
        title = self.request.data.get('title')
        game = Game.objects.get(title=title)
        game.users.remove(user)
        return game
