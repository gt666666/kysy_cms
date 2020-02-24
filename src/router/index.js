import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export const constantRoutes = [   //常规配置
  {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/Login')
  },
  {
    path: '/',
    component: () => import('@/layout/Layout'),
    redirect: '/home',
    meta: {
      title: '首页',

    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/Home'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
];

export const asyncRoutes = [   //异步路由
  {
    path: '/loan-input',   //loan-input  贷款申请 
    component: () => import('@/layout/Layout'),
    meta: {
      title: 'ERP管理',
      roles: ['erp'],
      icon:'#iconyiyaoxiang1'
    },
    children: [
      {
        path: '/ErpList',
        name:'ErpList',
        component: () => import('@/views/erp/ErpList'),
        meta: {
          title: '数据库主表列表'
        }
      },
      {
        path: '/ErpAdd',
        name:'ErpAdd',
        component: () => import('@/views/erp/ErpAdd'),
        meta: {
          title: '数据库主表增加'
        }
      }
    ]
  },
    {
      path: '/oa',  //input-manager申请管理
      component: () => import('@/layout/Layout'),
      meta: {
        title: 'OA管理',
        roles: ['oa'],
        icon:'#iconbangongbao'
      },
      children: [
        {
          path: '/ListInputManager',
          name: 'ListInputManager',
          component: () => import('@/views/oa/ListInputManager'),
          meta: {
            title: 'oa列表'
          }
        }, {
          path: '/AddInputManager',
          name: 'AddInputManager',
          component: () => import('@/views/oa/AddInputManager'),
          meta: {
            title: 'oa增加'
          }
        }
      ]
    },
  { path: '*', redirect: '/login',meta: {title: '登录页面',roles:['login'] }}
];

export default new Router({
  routes: constantRoutes
})

