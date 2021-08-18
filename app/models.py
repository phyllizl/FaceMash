from django.db import models

class Mp(models.Model):
    name = models.CharField(max_length=100, default=None)
    image = models.TextField(default=None)
    url = models.TextField(default=None)
    rank = models.IntegerField(default=None)
    snippet = models.TextField(null=True)
    wiki = models.TextField(null=True)


