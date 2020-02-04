from django.db import models


class Area(models.Model):
    """地区表"""
    name_cn = models.CharField(max_length=20, unique=True, verbose_name=u'中文名')
    name_en = models.CharField(max_length=20, null=True, blank=True, unique=True, verbose_name=u'简称')

    class Meta:
        verbose_name = u'地区表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name_en
