from captcha.image import ImageCaptcha
from random import randint
from users.models import UserMenu
import hashlib
import time
import random


def get_cookie(username):
    """
    使用sha1加密算法，返回username/当前时间戳/随机数加密后的字符串
    """
    curr_time = str(time.time())
    randint = str(random.randint(10000, 99999))
    random_str = username + randint + curr_time
    s1 = hashlib.sha1()
    s1.update(random_str.encode('utf-8'))
    encrypts = s1.hexdigest()
    return encrypts


def get_captcha():
    """
    生成随机验证码及其图片
    """
    char_list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                 'u', 'v', 'w', 'x', 'y', 'z',
                 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                 'U', 'V', 'W', 'X', 'Y', 'Z']
    chars = ''
    for i in range(4):
        chars += char_list[randint(0, 61)]
    image = ImageCaptcha().generate_image(chars)
    return chars, image


def compose_menu_dict(root_menu, all_parent_menu_objs):
    if not root_menu.children:
        return root_menu.get_vue_menu()
    else:
        vue_menu = root_menu.get_vue_menu()
        children_list = []
        for child in root_menu.children.all():
            if child in all_parent_menu_objs:
                children_list.append(compose_menu_dict(child, all_parent_menu_objs))
        if children_list:
            # 根据菜单index进行排序
            children_list = sorted(children_list, key=lambda x: x['index'])
            vue_menu['children'] = children_list
        return vue_menu


def get_user_menu(user):
    """获取用户有权限访问的菜单"""
    if user.is_superuser:
        menu_objs = [menu for menu in UserMenu.objects.all() if menu.is_leaf_menu()]
    else:
        # 获取用户所有权限
        user_permissions = [user_perm for user_perm in user.user_permissions.all()]
        group_permission = []
        for group in user.groups.all():
            group_permission.extend([group_perm for group_perm in group.permissions.all()])
        all_permissions = user_permissions + group_permission
        # 筛选出带menu的权限，标识进入菜单的权限
        menu_perms = [perm for perm in all_permissions if 'menu' in perm.codename]
        # 获取所有权限对应的叶子菜单
        menu_objs = []
        for perm in menu_perms:
            for menu in perm.usermenu_set.all():
                menu_objs.append(menu)
    # 获取构建树状菜单需要的所有菜单节点
    all_parent_menu_objs = set()
    for menu in menu_objs:
        all_parent_menu_objs = all_parent_menu_objs.union(menu.get_all_parent_nodes(own=True))
    # 获取所有根节点菜单
    root_menu_objs = list(set([menu.get_root_node() for menu in menu_objs]))
    # 构建完整树状菜单
    menu_list = [compose_menu_dict(root_menu, all_parent_menu_objs) for root_menu in root_menu_objs]
    return sorted(menu_list, key=lambda x: x['index'])
