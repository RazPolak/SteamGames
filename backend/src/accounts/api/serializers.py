from rest_framework import serializers
from django.contrib.auth import get_user_model
from games.models import Game


User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
            username=username,
            email=email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


class UserFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('title', 'price', 'published', 'img', 'users')


class UserFavoriteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('title',)
