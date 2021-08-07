from .models import Mp
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import MpSerializer


class MpViewSet(viewsets.ModelViewSet):
    ## The Main Query for the index route
    queryset = Mp.objects.all()
    # The serializer class for serializing output
    serializer_class = MpSerializer
    # optional permission class set permission level
    permission_classes = [permissions.AllowAny] #Coule be [permissions.IsAuthenticated]

