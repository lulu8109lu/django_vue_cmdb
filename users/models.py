from django.db import models
from django.contrib.auth.models import Permission


class UserMenu(models.Model):
    """用户菜单"""
    path = models.CharField(max_length=20, null=True, blank=True, verbose_name=u'路径')
    title = models.CharField(max_length=20, verbose_name=u'名称')
    icon = models.CharField(max_length=10, null=True, blank=True, verbose_name=u'图标')
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='children', verbose_name=u'父级菜单')
    permission = models.ForeignKey(Permission, null=True, blank=True, on_delete=models.SET_NULL, verbose_name=u'关联权限')

    class Meta:
        db_table = 'users_menu'
        verbose_name = u'用户菜单'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title

    def get_vue_menu(self):
        """
        获取vue菜单需要的字典格式：
        一级菜单：{'title': '服务器资源', 'icon': 'desktop', 'children': []}
        二级菜单：{'title': '服务器资源', 'children': []}
        ...
        叶子菜单：{'title': '服务器资源', 'path': '<与路由的path对应>'}
        """
        if self.children.all():
            if self.icon:
                return {'title': self.title, 'icon': self.icon, 'children': {}}
            else:
                return {'title': self.title, 'children': {}}
        else:
            return {'title': self.title, 'path': self.path}

    def get_self_parent(self, node):
        """递归获取父级节点"""
        if not node.parent:
            return node
        else:
            return self.get_self_parent(node.parent)

    def get_root_node(self):
        """获取根节点对象，即最顶层的菜单"""
        if not self.parent:
            return self
        else:
            return self.get_self_parent(self.parent)
