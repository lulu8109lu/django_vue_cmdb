from django.conf.urls import url
from users.views import *

urlpatterns = [
    url(r'^auth/(?P<version>[v1|v2]+)/$', auth, name='auth')
]
