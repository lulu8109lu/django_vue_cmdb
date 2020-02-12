from django.contrib import admin
from django.contrib.auth.models import Permission
from users.models import UserMenu


class PermissionAdmin(admin.ModelAdmin):
    fields = ['name', 'content_type', 'codename']
    list_display = ['name', 'content_type', 'codename']
    list_per_page = 20
    search_fields = ('name', 'codename')


class UserMenuAdmin(admin.ModelAdmin):
    fields = ['index', 'path', 'parent', 'title', 'icon', 'permission']
    list_display = ['index', 'path', 'parent', 'title', 'icon', 'permission']
    ordering = ('index',)
    list_per_page = 20
    search_fields = ('path', 'title')
    list_display_links = ('title',)


admin.site.register(Permission, PermissionAdmin)
admin.site.register(UserMenu, UserMenuAdmin)
