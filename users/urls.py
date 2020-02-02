from django.conf.urls import url
from users.views import *

urlpatterns = [
    url(r'^login/(?P<version>[v1|v2]+)/$', user_login, name='login'),
    url(r'^captcha/(?P<image_uuid>[\w-]+)/(?P<version>[v1|v2]+)/$', user_captcha, name='captcha'),
]
