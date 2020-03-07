# 基于 Django + D2Admin 的运维平台

#### 项目依赖
- Python 3.x
- Django 3.0.2
- D2Admin
- node.js
- MySQL 5.7
- Redis

### 部署
- 安装Python3.X

- 安装node.js

- 下载项目代码并解压

- 进入目录 django_vue_cmdb/d2-admin

```
# 安装前端npm包依赖
cd django_vue_cmdb/d2-admin
npm install
```
- 修改 django_vue_cmdb 目录下的settings.py
```
# 修改数据库配置
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_vue_cmdb',
        'USER': 'root',
        'PASSWORD': 'Python@123',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
# 修改Redis配置
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/2',
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "PASSWORD": "Redis@123"
        },
    },
}
```

- 安装项目依赖的python库
```
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

- 运行前端项目
```
cd d2-admin
npm run dev
```

- 运行后端项目
```
python manage.py runserver localhost:8000
```

- 整合前端与后端项目
```
# 修改d2-admin/vue.config.js文件
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/static/'
```
```
# 运行前端打包命令
cd d2-admin
npm run build
```
```
# 收集项目所有静态文件
python manage.py collectstatic
```
```
# 还原d2-admin/vue.config.js文件
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'
```

