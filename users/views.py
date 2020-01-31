from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from users.utils import get_cookie
import json
import uuid


@csrf_exempt
def auth(request, version):
    if request.method == 'POST':
        result = {
            'code': 0,
            'msg': '登录成功',
            'data': {
                'username': '',
                'password': '',
                'name': '',
                'token': '',
                'uuid': ''
            }
        }
        try:
            raw_data = json.loads(request.body.decode('utf-8'))
            username = raw_data.get('username')
            password = raw_data.get('password')
            user = authenticate(username=username, password=password)
            if user:
                result['data']['username'] = username
                result['data']['password'] = password
                result['data']['name'] = username
                result['data']['token'] = get_cookie(username)
                result['data']['uuid'] = str(uuid.uuid4())
                login(request, user)
            else:
                result = {
                    'code': 401,
                    'msg': '用户名或密码错误',
                    'data': {}
                }
        except Exception as e:
            result['code'] = 500
            result['msg'] = str(e)
        finally:
            return JsonResponse(result)
