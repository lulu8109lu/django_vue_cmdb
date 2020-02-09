from django.db import models
from django.contrib.auth.models import Permission


class UserMenu(models.Model):
    """用户菜单"""
    path = models.CharField(max_length=20, null=True, blank=True, verbose_name=u'路径')
    title = models.CharField(max_length=20, verbose_name=u'名称')
    icon = models.CharField(max_length=10, null=True, blank=True, verbose_name=u'图标')
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, verbose_name=u'父级菜单')
    permission = models.ForeignKey(Permission, null=True, blank=True, on_delete=models.SET_NULL, verbose_name=u'关联权限')

    class Meta:
        db_table = 'users_menu'
        verbose_name = u'用户菜单'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title
