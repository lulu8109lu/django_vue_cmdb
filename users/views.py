from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def auth(request):
    if request.method == 'POST':
        result = {
            'code': 0,
            'msg': '登录成功',
            'data': {
                'username': 'admin',
                'password': 'admin',
                'name': 'Admin',
                'token': '8dfhassad0asdjwoeiruty',
                'uuid': 'admin-uuid'
            }
        }
        return JsonResponse(result)
