from django.core import serializers
import json


def get_model_columns(model):
    """
    生成表格表头
    格式：
    [
        {
          title: '日期',
          key: 'date',
          showOverflowTooltip: True
        },
        {
          title: '姓名',
          key: 'name',
          showOverflowTooltip: True
        },
        {
          title: '地址',
          key: 'address'
          showOverflowTooltip: True
        }
    ]
    """
    columns = []
    for field in model._meta.fields:
        if field.name == 'id':
            continue
        field_info = {
            'title': field.verbose_name,
            'key': field.name,
            'showOverflowTooltip': True
        }
        columns.append(field_info)
    return columns


def get_model_data(model):
    """
    生成表格数据
    格式：
    [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
    ]
    """
    data_list = serializers.serialize("json", model.objects.all())
    fields_data = [dict(data['fields'], **{'id': data['pk']}) for data in json.loads(data_list)]
    fields_data.sort(key=lambda x: int(x['id']), reverse=False)
    return fields_data
