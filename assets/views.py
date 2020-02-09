from django_vue_cmdb.expiring_token_authentication import ExpireTokenAuthentication
from rest_framework import permissions
from rest_framework.views import APIView
from django.http import JsonResponse
from django_vue_cmdb.utils import get_model_data
from django_vue_cmdb.utils import get_model_columns
from assets.models import Area
from django.db import IntegrityError
from django.db.models import Q


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
            # 校验操作权限
            if not request.user.has_perm('assets.view_area'):
                raise PermissionError

            raw_data = request.data
            pagination = raw_data.get('pagination', {})
            current_page = pagination.get('currentPage', 1)
            page_size = pagination.get('pageSize', 10)
            table_filter = raw_data.get('tableFilter', {})
            whole_search = table_filter.get('wholeSearch', '')
            name_en_select = table_filter.get('nameEnSelect', '')

            # 拼接筛选条件
            sub_query_and = Q()
            sub_query_or = Q()
            if whole_search:
                sub_query_or.add(Q(name_cn__icontains=whole_search), Q.OR)
                sub_query_or.add(Q(name_en__icontains=whole_search), Q.OR)
            if name_en_select:
                sub_query_and.add(Q(name_en__icontains=name_en_select), Q.AND)
            sub_query = sub_query_and & sub_query_or

            # 获取表头
            result['data']['columns'] = get_model_columns(Area)
            # 获取所有数据行
            row_data = get_model_data(Area, sub_query)
            total = len(row_data)
            result['data']['total'] = total

            # 分页
            row_data = row_data[(current_page - 1) * page_size:current_page * page_size]
            result['data']['row_data'] = row_data

        except PermissionError:
            result = {
                'code': 403,
                'msg': '权限受限',
                'data': {}
            }
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
                # 校验操作权限
                if not request.user.has_perm('assets.change_area'):
                    raise PermissionError
                area_id = raw_data.pop('id')
                area_obj = Area.objects.filter(pk=area_id)
                area_obj.update(**raw_data)
            elif action == 'add':
                # 校验操作权限
                if not request.user.has_perm('assets.add_area'):
                    raise PermissionError
                Area.objects.create(**raw_data)
            elif action == 'delete':
                # 校验操作权限
                if not request.user.has_perm('assets.delete_area'):
                    raise PermissionError
                select_data = raw_data.get('selectData', [])
                delete_area_id = [data['id'] for data in select_data]
                area_obj = Area.objects.filter(id__in=delete_area_id)
                area_obj.delete()
            else:
                raise Exception('未知操作类型')
        except IntegrityError:
            result = {
                'code': 500,
                'msg': '已存在，请勿重复添加',
                'data': {}
            }
        except PermissionError:
            result = {
                'code': 403,
                'msg': '权限受限',
                'data': {}
        }
        except Exception as e:
            result = {
                'code': 500,
                'msg': str(e),
                'data': {}
            }
        finally:
            return JsonResponse(result)


class ListNameEn(APIView):
    """列出地区英文简称"""
    authentication_classes = (ExpireTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, version):
        result = {
            'code': 0,
            'msg': '修改成功',
            'data': {}
        }
        try:
            # 校验操作权限
            if not request.user.has_perm('assets.view_area'):
                raise PermissionError

            list_name_en = [{'label': data['name_en'], 'value': data['name_en']} for data in list(Area.objects.values('name_en').distinct())]
            result['data']['list_name_en'] = list_name_en
        except PermissionError:
            result = {
                'code': 403,
                'msg': '权限受限',
                'data': {}
            }
        except Exception as e:
            result = {
                'code': 500,
                'msg': str(e),
                'data': {}
            }
        finally:
            return JsonResponse(result)
