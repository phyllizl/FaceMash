from .models import Mp
from django.contrib.auth.models import User, Group
from rest_framework import serializers

# Our TodoSerializer
class MpSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        # The model it will serialize
        model = Mp
        # the fields that should be included in the serialized output
        fields = ['name', 'url', 'image', 'rank']