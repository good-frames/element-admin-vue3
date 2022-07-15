export const menus = [
  {
    name: '首页',
    path: '/main/home',
    icon: 'House'
  },
  {
    name: '新闻',
    icon: 'Coin',
    children: [
      {
        name: '新闻列表',
        path: '/main/new'
      }
    ]
  },
  {
    name: '个人中心',
    path: '/main/user',
    icon: 'User'
  },
  {
    name: '设置',
    path: '/main/about',
    icon: 'Setting'
  }
]
