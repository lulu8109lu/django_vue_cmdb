# -*- coding: utf-8 -*-
"""
项目：cmdb61 
文件名：urls.py
创建时间：2020/2/28 9:28
作者：陈捷丰
"""

from django.conf.urls import url
from workflows.views import *

urlpatterns = [
    url(r'^workflow_submit/(?P<version>[v1|v2]+)/$', WorkflowSubmit.as_view(), name='workflow_submit'),
    url(r'^workflow_approve/(?P<version>[v1|v2]+)/$', WorkflowApprove.as_view(), name='workflow_approve'),
    url(r'^check_valid_title/(?P<version>[v1|v2]+)/$', CheckValidTitle.as_view(), name='check_valid_title'),
    url(r'^get_approve_chain/(?P<version>[v1|v2]+)/$', GetApproveChain.as_view(), name='get_approve_chain'),
    url(r'^list_my_applied/(?P<version>[v1|v2]+)/$', ListMyApplied.as_view(), name='list_my_applied'),
    url(r'^list_workflow/(?P<version>[v1|v2]+)/$', ListWorkflow.as_view(), name='list_workflow'),
    url(r'^workflow_detail/(?P<version>[v1|v2]+)/$', WorkflowDetail.as_view(), name='workflow_detail'),
    url(r'^list_my_approval_pending/(?P<version>[v1|v2]+)/$', ListMyApprovePending.as_view(),
        name='list_my_approval_pending'),
    url(r'^list_my_approved/(?P<version>[v1|v2]+)/$', ListMyApproved.as_view(), name='list_my_approved'),
    url(r'^get_approve_pending_cnt/(?P<version>[v1|v2]+)/$', GetApprovePendingCnt.as_view(), name='get_approve_pending_cnt'),
]
