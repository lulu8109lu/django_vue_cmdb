// 菜单 侧边栏
export default [
  {path: '/index', title: '首页', icon: 'home'},
  {path: '/dashboard', title: '仪表盘', icon: 'dashboard'},
  {
    title: '服务器资源',
    icon: 'desktop',
    children: [
      {
        title: '基础信息',
        children: [
          {path: '/assets/area', title: '地区'},
          {path: '/assets/room', title: '机房'},
          {path: '/assets/business', title: '业务类型'},
          {path: '/assets/cloud', title: '云供应商'}
        ]
      },
      {
        title: '主机相关',
        children: [
          {path: '/assets/host/list', title: '主机列表'},
          {path: '/assets/host/changeRecord', title: '变更记录'},
          {path: '/assets/host/initialize', title: '主机初始化'},
          {path: '/assets/host/purchase', title: '主机购买'},
          {path: '/assets/opsmanager', title: '运维管理机'}
        ]
      }, {
        title: '统计汇总',
        children: [
          {path: '/assets/statistics/HostNum', title: '主机数量'},
          {path: '/assets/statistics/PermDistribute', title: '权限分布类型'},
          {path: '/assets/statistics/ServerPerm', title: '服务器权限'},
        ]
      },
    ]
  },
  {
    title: 'IT设备管理',
    icon: 'info-circle',
    children: [
      {path: '/it_assets/company', title: '所属公司'},
      {path: '/it_assets/position', title: '资产位置'},
      {path: '/it_assets/supplier', title: '供应商'},
      {path: '/it_assets/warehousing', title: '仓库区域'},
      {path: '/it_assets/LogAssets', title: '资产变更'},
      {
        title: '资产查询',
        children: [
          {path: '/it_assets/query/AssetsReception', title: '固定资产'},
          {path: '/it_assets/query/ShellAssetsReception', title: '列管资产'},
          {path: '/it_assets/query/SubAssets', title: '主机配件'},
        ]
      },
      {path: '/it_assets/AssetsCharts', title: '统计图表'},
      {path: '/it_assets/AssetsTemplate', title: '资产模板'},
      {path: '/it_assets/BatchAlter', title: '批量修改'},
      {path: '/it_assets/AssetsTrace', title: '资产追踪'},
    ]
  },
  {
    title: '游戏项目管理',
    icon: 'cogs',
    children: [
      {path: '/game_project/AlterOpenTime', title: '修改开服时间'},
      {path: '/game_project/ChangeRecord', title: '区服操作记录'},
      {path: '/game_project/GameServerType', title: '区服类型'},
      {path: '/game_project/GameServerList', title: '区服列表'},
      {path: '/game_project/InstallServer', title: '装 / 卸区服管理'},
      {path: '/game_project/MergeSchedule', title: '合服计划'},
      {path: '/game_project/OffSchedule', title: '下架计划'},
      {path: '/game_project/Projects', title: '项目列表'},
    ]
  },
  {
    title: 'SaltStack管理',
    icon: 'clock-o',
    children: [
      {path: '/saltstack/SlsManager', title: 'sls管理'},
      {path: '/saltstack/SaltCmd', title: '执行salt命令'},
    ]
  },
  {
    title: '数据库管理',
    icon: 'database',
    children: [
      {path: '/mysql/instance', title: 'MySQL实例'},
      {path: '/mysql/ChangeRecord', title: '变更记录'},
    ]
  },
  {title: '值班安排管理', icon: 'calendar', path: '/duty_schedule'},
  {
    title: 'CDN 管理',
    icon: 'cloud',
    children: [
      {path: '/CDN/APIInfo', title: 'CDN 接口信息'},
      {path: '/CDN/APIRefresh', title: 'CDN 刷新'},
      {path: '/CDN/RefreshRecord', title: 'CDN 刷新记录'},
    ]
  },
  {title: 'Celery 管理', icon: 'random', path: '/celery/monitor'},
  {
    title: 'CDN管理',
    icon: 'cube',
    children: [
      {path: '/SVN/SVNRepo', title: 'SVN 仓库'},
      {path: '/SVN/SVNScheme', title: 'SVN 权限方案'},
    ]
  },
  {
    title: '工单流程',
    icon: 'exchange',
    children: [
      {path: '/workflows/ApplyHistory', title: '我的申请'},
      {path: '/workflows/ApplyHistoryAll', title: '申请工单汇总'},
      {path: '/workflows/ApprovedList', title: '我的审批记录'},
      {path: '/workflows/ApproveList', title: '我的待审批'},
      {path: '/workflows/WorkflowList', title: '工单列表'},
      {path: '/workflows/VersionUpdate', title: '版本更新单汇总'},
      {
        title: '配置汇总',
        children: [
          {path: '/workflows/config/CeleryQueueConfig', title: '版本更新单汇总'},
          {path: '/workflows/config/HotUpdateTemplate', title: '热更新模板'},
          {path: '/workflows/config/SpecialUser', title: '特殊人员配置'},
          {path: '/workflows/config/StateSpecifiedUser', title: '流程审批人配置'},
          {path: '/workflows/config/WebAPIGetCDNList', title: 'WebAPI-获取cdn列表'},
          {path: '/workflows/config/WechatAccountTransfer', title: '企业微信账号转换'},
        ]
      }
    ]
  },
  {
    title: '热更新任务',
    icon: 'tasks',
    children: [
      {path: '/hotupdate/HotUpdateList', title: '热更新控制台'},
      {path: '/hotupdate/MyHotUpdate', title: '我的热更新'},
      {path: '/hotupdate/OpsManagerLock', title: '项目地区锁'},
    ]
  },
  {
    title: '用户管理',
    icon: 'user',
    children: [
      {path: '/user/BatchDesert', title: '批量离职'},
      {path: '/user/ChangeRecord', title: '变更记录'},
      {path: '/user/CleanRecord', title: '清除结果汇总'},
      {path: '/user/ShareInfoTemplate', title: '入职信息模板'},
      {path: '/user/UserManager', title: '用户管理'},
    ]
  }
]
