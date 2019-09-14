from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.


class Game(models.Model):
    title = models.CharField(max_length=200)
    price = models.CharField(max_length=200)
    published = models.CharField(max_length=200)
    img = models.CharField(max_length=300, default="")
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.title

    def validate_unique(self, exclude=None):
        obj = Game.objects.filter(title=self.title)
        if obj.exists():
            return False
        return True

    def save(self, *args, **kwargs):
        if self.validate_unique():
            super(Game, self).save(*args, **kwargs)
