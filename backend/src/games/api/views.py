from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from django_filters.rest_framework import DjangoFilterBackend


from games.models import Game
from .serializers import GameSerializer
from games.scraper import activateScraper


class GameListView(ListAPIView):
    #queryset = Game.objects.all()
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = Game.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            return queryset.filter(title=title)
        return queryset


class GameDetailView(RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
