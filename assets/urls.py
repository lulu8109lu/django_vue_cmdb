from django.conf.urls import url
from assets.views import *

urlpatterns = [
    url(r'^list_area/(?P<version>[v1|v2]+)/$', ListArea.as_view(), name='list_area'),
    url(r'^area_data/(?P<version>[v1|v2]+)/$', AreaData.as_view(), name='area_data'),
    url(r'^list_name_en/(?P<version>[v1|v2]+)/$', ListNameEn.as_view(), name='list_name_en'),
]
