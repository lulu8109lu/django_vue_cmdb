from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
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
                rand_token = get_cookie(username)
                data = {
                    'username': username,
                    'password': password,
                    'name': username,
                    'token': rand_token,
                    'uuid': str(uuid.uuid4())
                }
                result['data'] = data
                # 更新django登录状态
                login(request, user)
                # 保存最新token到数据库
                token_obj = Token.objects.filter(user=user)
                if token_obj:
                    token_obj.update(**{'key': rand_token})
                else:
                    Token.objects.create(user=user, key=rand_token)
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
