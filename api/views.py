from rest_framework import viewsets

from .serializers import CredentialSerializer
from spoofingAttack.models import Credential


class CredentialViewSet(viewsets.ModelViewSet):
    #queryset = Credential.objects.all().order_by('email')
    queryset = Credential.objects.filter(email = 'amare')
    serializer_class = CredentialSerializer
