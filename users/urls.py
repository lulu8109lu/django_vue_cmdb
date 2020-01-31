from django.conf.urls import url
from users.views import *

urlpatterns = [
    url(r'^auth/v1/$', auth, name='auth')
]
