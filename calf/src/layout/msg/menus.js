export default [
  {
    id: '1',
    path: 'users',
    authName: '用户管理',
    children: [
      {
        id: '1-1',
        path: 'users',
        authName: '用户'
      }
    ]
  },
  {
    id: '2',
    path: 'users',
    authName: '角色管理',
    children: [
      {
        id: '2-1',
        path: 'roles',
        authName: '角色'
      }
    ]
  },
  {
    id: '3',
    path: 'users',
    authName: '权限管理',
    children: [
      {
        id: '3-1',
        path: 'rights',
        authName: '权限'
      }
    ]
  }
]
