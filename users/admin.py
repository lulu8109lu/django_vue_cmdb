from django.contrib import admin
from django.contrib.auth.models import Permission
from users.models import UserMenu


class PermissionAdmin(admin.ModelAdmin):
    fields = ['name', 'content_type', 'codename']
    list_display = ['name', 'content_type', 'codename']
    list_per_page = 20
    search_fields = ('name', 'codename')


class UserMenuAdmin(admin.ModelAdmin):
    fields = ['path', 'title', 'icon', 'parent', 'permission']
    list_display = ['path', 'title', 'icon', 'parent', 'permission']
    list_per_page = 20
    search_fields = ('path', 'title')
    list_display_links = ('title',)


admin.site.register(Permission, PermissionAdmin)
admin.site.register(UserMenu, UserMenuAdmin)
