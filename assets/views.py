from django_vue_cmdb.expiring_token_authentication import ExpireTokenAuthentication
from rest_framework import permissions
from rest_framework.views import APIView
from django.http import JsonResponse
from django_vue_cmdb.utils import get_model_data
from django_vue_cmdb.utils import get_model_columns
from assets.models import Area
import json


class ListArea(APIView):
    """地区列表数据"""
    authentication_classes = (ExpireTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, version):
        result = {
            'code': 0,
            'msg': '请求成功',
            'data': {
                'columns': '',
                'row_data': '',
            }
        }
        try:
            raw_data = request.data
            current_page = raw_data.get('currentPage', 1)
            page_size = raw_data.get('pageSize', 10)
            result['data']['columns'] = get_model_columns(Area)
            row_data = get_model_data(Area)
            total = len(row_data)
            row_data = row_data[(current_page - 1) * page_size:current_page * page_size]
            result['data']['row_data'] = row_data
            result['data']['total'] = total
        except Exception as e:
            result = {
                'code': 500,
                'msg': str(e),
                'data': {}
            }
        finally:
            return JsonResponse(result)


class AreaData(APIView):
    """新增、修改、删除地区数据"""
    authentication_classes = (ExpireTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, version):
        result = {
            'code': 0,
            'msg': '修改成功',
            'data': {}
        }
        try:
            raw_data = request.data
            action = raw_data.pop('action', None)
            if action == 'edit':
                area_id = raw_data.pop('id')
                area_obj = Area.objects.filter(pk=area_id)
                area_obj.update(**raw_data)
            elif action == 'add':
                Area.objects.create(**raw_data)
            elif action == 'delete':
                select_data = raw_data.get('selectData', [])
                delete_area_id = [data['id'] for data in select_data]
                area_obj = Area.objects.filter(id__in=delete_area_id)
                area_obj.delete()
            else:
                raise Exception('未知操作类型')
        except Exception as e:
            result = {
                'code': 500,
                'msg': str(e),
                'data': {}
            }
        finally:
            return JsonResponse(result)
