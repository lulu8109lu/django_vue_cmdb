import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: {name: 'index'},
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'page1',
        name: 'page1',
        meta: {
          title: '页面 1',
          auth: true
        },
        component: _import('demo/page1')
      },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: '页面 2',
          auth: true
        },
        component: _import('demo/page2')
      },
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '页面 3',
          auth: true
        },
        component: _import('demo/page3')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: '仪表盘',
          auth: true
        },
        component: _import('dashboard')
      },
      {
        path: 'assets/area',
        name: 'area',
        meta: {
          title: '地区表',
          auth: true
        },
        component: _import('assets/area')
      },
      {
        path: 'assets/room',
        name: 'room',
        meta: {
          title: '机房',
          auth: true
        },
        component: _import('assets/room')
      },
      {
        path: 'assets/business',
        name: 'business',
        meta: {
          title: '业务类型',
          auth: true
        },
        component: _import('assets/business')
      },
      {
        path: 'assets/cloud',
        name: 'cloud',
        meta: {
          title: '云供应商',
          auth: true
        },
        component: _import('assets/cloud')
      },
      {
        path: 'assets/opsmanager',
        name: 'opsmanager',
        meta: {
          title: '运维管理机',
          auth: true
        },
        component: _import('assets/opsmanager')
      },
      {
        path: 'assets/host/list',
        name: 'host',
        meta: {
          title: '主机列表',
          auth: true
        },
        component: _import('assets/host/List.vue')
      },
      {
        path: 'assets/host/changeRecord',
        name: 'changeRecord',
        meta: {
          title: '变更记录',
          auth: true
        },
        component: _import('assets/host/ChangeRecord.vue')
      },
      {
        path: 'assets/host/initialize',
        name: 'initialize',
        meta: {
          title: '主机初始化',
          auth: true
        },
        component: _import('assets/host/Initialize.vue')
      },
      {
        path: 'assets/host/purchase',
        name: 'purchase',
        meta: {
          title: '主机购买',
          auth: true
        },
        component: _import('assets/host/Purchase.vue')
      },
      {
        path: 'assets/host/usage',
        name: 'usage',
        meta: {
          title: '主机使用率',
          auth: true
        },
        component: _import('assets/host/Usage.vue')
      },
      {
        path: 'assets/statistics/HostNum',
        name: 'HostNum',
        meta: {
          title: '主机数量',
          auth: true
        },
        component: _import('assets/statistics/HostNum.vue')
      },
      {
        path: 'assets/statistics/PermDistribute',
        name: 'PermDistribute',
        meta: {
          title: '权限分布类型',
          auth: true
        },
        component: _import('assets/statistics/PermDistribute.vue')
      },
      {
        path: 'assets/statistics/ServerPerm',
        name: 'ServerPerm',
        meta: {
          title: '服务器权限',
          auth: true
        },
        component: _import('assets/statistics/ServerPerm.vue')
      },
      {
        path: 'it_assets/query/assetsReception',
        name: 'assetsReception',
        meta: {
          title: '固定资产',
          auth: true
        },
        component: _import('it_assets/query/AssetsReception.vue')
      },
      {
        path: 'it_assets/query/subAssets',
        name: 'subAssets',
        meta: {
          title: '主机配件',
          auth: true
        },
        component: _import('it_assets/query/SubAssets.vue')
      },
      {
        path: 'it_assets/query/ShellAssetsReception',
        name: 'shellAssets',
        meta: {
          title: '列管资产',
          auth: true
        },
        component: _import('it_assets/query/ShellAssetsReception.vue')
      },
      {
        path: 'it_assets/AssetsCharts',
        name: 'AssetsCharts',
        meta: {
          title: '资产统计图表',
          auth: true
        },
        component: _import('it_assets/AssetsCharts.vue')
      },
      {
        path: 'it_assets/AssetsTemplate',
        name: 'AssetsTemplate',
        meta: {
          title: '资产模板',
          auth: true
        },
        component: _import('it_assets/AssetsTemplate.vue')
      },
      {
        path: 'it_assets/AssetsTrace',
        name: 'AssetsTrace',
        meta: {
          title: '资产追踪',
          auth: true
        },
        component: _import('it_assets/AssetsTrace.vue')
      },
      {
        path: 'it_assets/BatchAlter',
        name: 'BatchAlter',
        meta: {
          title: '批量修改',
          auth: true
        },
        component: _import('it_assets/BatchAlter.vue')
      },
      {
        path: 'it_assets/company',
        name: 'company',
        meta: {
          title: '所属公司',
          auth: true
        },
        component: _import('it_assets/company.vue')
      },
      {
        path: 'it_assets/LogAssets',
        name: 'LogAssets',
        meta: {
          title: '资产变更',
          auth: true
        },
        component: _import('it_assets/LogAssets.vue')
      },
      {
        path: 'it_assets/position',
        name: 'position',
        meta: {
          title: '资产位置',
          auth: true
        },
        component: _import('it_assets/position.vue')
      },
      {
        path: 'it_assets/supplier',
        name: 'supplier',
        meta: {
          title: '资产供应商',
          auth: true
        },
        component: _import('it_assets/supplier.vue')
      },
      {
        path: 'it_assets/warehousing',
        name: 'warehousing',
        meta: {
          title: '仓库区域',
          auth: true
        },
        component: _import('it_assets/warehousing.vue')
      },
      {
        path: 'game_project/AlterOpenTime',
        name: 'AlterOpenTime',
        meta: {
          title: '修改开服时间',
          auth: true
        },
        component: _import('game_project/AlterOpenTime.vue')
      },
      {
        path: 'game_project/ChangeRecord',
        name: 'ChangeRecord',
        meta: {
          title: '区服操作记录',
          auth: true
        },
        component: _import('game_project/ChangeRecord.vue')
      },
      {
        path: 'game_project/GameServerList',
        name: 'GameServerList',
        meta: {
          title: '区服列表',
          auth: true
        },
        component: _import('game_project/GameServerList.vue')
      },
      {
        path: 'game_project/GameServerType',
        name: 'GameServerType',
        meta: {
          title: '区服类型表',
          auth: true
        },
        component: _import('game_project/GameServerType.vue')
      },
      {
        path: 'game_project/InstallServer',
        name: 'InstallServer',
        meta: {
          title: '装 / 卸管理',
          auth: true
        },
        component: _import('game_project/InstallServer.vue')
      },
      {
        path: 'game_project/MergeSchedule',
        name: 'MergeSchedule',
        meta: {
          title: '合服计划',
          auth: true
        },
        component: _import('game_project/MergeSchedule.vue')
      },
      {
        path: 'game_project/OffSchedule',
        name: 'OffSchedule',
        meta: {
          title: '下架计划',
          auth: true
        },
        component: _import('game_project/OffSchedule.vue')
      },
      {
        path: 'game_project/Projects',
        name: 'Projects',
        meta: {
          title: '项目列表',
          auth: true
        },
        component: _import('game_project/Projects.vue')
      },
      {
        path: 'saltstack/SlsManager',
        name: 'SlsManager',
        meta: {
          title: 'sls管理',
          auth: true
        },
        component: _import('saltstack/SlsManager.vue')
      },
      {
        path: 'saltstack/SaltCmd',
        name: 'SaltCmd',
        meta: {
          title: '执行salt命令',
          auth: true
        },
        component: _import('saltstack/SaltCmd.vue')
      },
      {
        path: 'mysql/instance',
        name: 'instance',
        meta: {
          title: 'MySQL实例',
          auth: true
        },
        component: _import('mysql/MySQLInstance.vue')
      },
      {
        path: 'mysql/ChangeRecord',
        name: 'ChangeRecord',
        meta: {
          title: '变更记录',
          auth: true
        },
        component: _import('mysql/ChangeRecord.vue')
      },
      {
        path: 'duty_schedule',
        name: 'duty_schedule',
        meta: {
          title: '值班安排管理',
          auth: true
        },
        component: _import('duty_schedule')
      },
      {
        path: 'APIInfo',
        name: 'APIInfo',
        meta: {
          title: 'CDN 接口信息',
          auth: true
        },
        component: _import('CDN/APIInfo.vue')
      },
      {
        path: 'APIRefresh',
        name: 'APIRefresh',
        meta: {
          title: 'CDN 刷新',
          auth: true
        },
        component: _import('CDN/APIRefresh.vue')
      },
      {
        path: 'RefreshRecord',
        name: 'RefreshRecord',
        meta: {
          title: 'CDN 刷新记录',
          auth: true
        },
        component: _import('CDN/RefreshRecord.vue')
      },
      {
        path: 'celery/monitor',
        name: 'CeleryMonitor',
        meta: {
          title: 'Celery监控',
          auth: true
        },
        component: _import('celery')
      },
      {
        path: 'SVN/SVNRepo',
        name: 'SVNRepo',
        meta: {
          title: 'SVN 仓库',
          auth: true
        },
        component: _import('SVN/SVNRepo.vue')
      },
      {
        path: 'SVN/SVNPermScheme',
        name: 'SVNPermScheme',
        meta: {
          title: 'SVN 权限方案',
          auth: true
        },
        component: _import('SVN/SVNRepo.vue')
      },
      {
        path: 'workflows/ApplyHistory',
        name: 'ApplyHistory',
        meta: {
          title: '我的申请',
          auth: true
        },
        component: _import('workflows/ApplyHistory.vue')
      },
      {
        path: 'workflows/ApplyHistoryALL',
        name: 'ApplyHistoryALL',
        meta: {
          title: '申请工单汇总',
          auth: true
        },
        component: _import('workflows/ApplyHistoryAll.vue')
      },
      {
        path: 'workflows/ApprovedList',
        name: 'ApprovedList',
        meta: {
          title: '我的审批记录',
          auth: true
        },
        component: _import('workflows/ApprovedList.vue')
      },
      {
        path: 'workflows/ApproveList',
        name: 'ApproveList',
        meta: {
          title: '我的待审批',
          auth: true
        },
        component: _import('workflows/ApproveList.vue')
      },
      {
        path: 'workflows/WorkflowList',
        name: 'WorkflowList',
        meta: {
          title: '工单列表',
          auth: true
        },
        component: _import('workflows/WorkflowList.vue')
      },
      {
        path: 'workflows/VersionUpdate',
        name: 'VersionUpdate',
        meta: {
          title: '版本更新单汇总',
          auth: true
        },
        component: _import('workflows/VersionUpdate.vue')
      },
      {
        path: 'workflows/config/CeleryQueueConfig',
        name: 'CeleryQueueConfig',
        meta: {
          title: 'Celery队列配置',
          auth: true
        },
        component: _import('workflows/config/CeleryQueueConfig.vue')
      },
      {
        path: 'workflows/config/HotUpdateTemplate',
        name: 'HotUpdateTemplate',
        meta: {
          title: '热更新模板',
          auth: true
        },
        component: _import('workflows/config/HotUpdateTemplate.vue')
      },
      {
        path: 'workflows/config/SpecialUser',
        name: 'SpecialUser',
        meta: {
          title: '特殊人员配置',
          auth: true
        },
        component: _import('workflows/config/SpecialUser.vue')
      },
      {
        path: 'workflows/config/StateSpecifiedUser',
        name: 'StateSpecifiedUser',
        meta: {
          title: '流程审批人配置',
          auth: true
        },
        component: _import('workflows/config/StateSpecifiedUser.vue')
      },
      {
        path: 'workflows/config/WebAPIGetCDNList',
        name: 'WebAPIGetCDNList',
        meta: {
          title: 'WebAPI-获取cdn列表',
          auth: true
        },
        component: _import('workflows/config/WebAPIGetCDNList.vue')
      },
      {
        path: 'workflows/config/WechatAccountTransfer',
        name: 'WechatAccountTransfer',
        meta: {
          title: '企业微信账号转换',
          auth: true
        },
        component: _import('workflows/config/WechatAccountTransfer.vue')
      },
      {
        path: 'hotupdate/HotUpdateList',
        name: 'HotUpdateList',
        meta: {
          title: '热更新控制台',
          auth: true
        },
        component: _import('hotupdate/HotUpdateList.vue')
      },
      {
        path: 'hotupdate/MyHotUpdate',
        name: 'MyHotUpdate',
        meta: {
          title: '我的热更新',
          auth: true
        },
        component: _import('hotupdate/MyHotUpdate.vue')
      },
      {
        path: 'hotupdate/OpsManagerLock',
        name: 'OpsManagerLock',
        meta: {
          title: '项目地区锁',
          auth: true
        },
        component: _import('hotupdate/OpsManagerLock.vue')
      },
      {
        path: 'user/BatchDesert',
        name: 'BatchDesert',
        meta: {
          title: '批量离职',
          auth: true
        },
        component: _import('user/BatchDesert.vue')
      },
      {
        path: 'user/ChangeRecord',
        name: 'ChangeRecord',
        meta: {
          title: '变更记录',
          auth: true
        },
        component: _import('user/ChangeRecord.vue')
      },
      {
        path: 'user/CleanRecord',
        name: 'CleanRecord',
        meta: {
          title: '清除结果汇总',
          auth: true
        },
        component: _import('user/CleanRecord.vue')
      },
      {
        path: 'user/ShareInfoTemplate',
        name: 'ShareInfoTemplate',
        meta: {
          title: '入职信息模板',
          auth: true
        },
        component: _import('user/ShareInfoTemplate.vue')
      },
      {
        path: 'user/UserManager',
        name: 'UserManager',
        meta: {
          title: '用户管理',
          auth: true
        },
        component: _import('user/UserManager.vue')
      }
    ]
  }
];

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
