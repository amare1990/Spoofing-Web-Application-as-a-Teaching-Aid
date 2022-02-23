# serializers.pyfrom rest_framework import serializers
from rest_framework import serializers

from spoofingAttack.models import Credential

class CredentialSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Credential
        fields = ('id', 'email', 'password')
