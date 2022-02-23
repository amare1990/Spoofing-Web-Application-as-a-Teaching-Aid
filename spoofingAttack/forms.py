from django import forms
from .models import Credential

class CredentialsForm(forms.ModelForm):
      password = forms.CharField(widget=forms.PasswordInput(attrs ={'placeholder':"password"}))
      email = forms.CharField(widget=forms.TextInput(attrs ={'placeholder':"email or phone number"}))
      class Meta:
            model = Credential

            fields = '__all__'
