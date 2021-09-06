import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    /* hidden: true */
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  
  // {
  //   path: "/baogao",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "baogao",
  //       name: "Baogao",
  //       component: () => import("@/views/baogao/index"),
  //       meta: { title: "作业填写", icon: "nested" }
  //     }
  //   ]
  // },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test/index"),
        meta: { title: "页面测试", icon: "nested" },
        hidden:true
      }
    ]
  },
  
  
  // {
  //   path: '/tianxie1',
  //   name: 'tianxie',
  //   component: () => import('@/views/tianxie1.vue'),
  // },
  
  // {
  //   path: "/dati",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "dati",
  //       name: "dati",
  //       component: () => import("@/views/dati/index"),
  //       meta: { title: "学生端作业情况", icon: "el-icon-s-help" }
  //     }
  //   ]
  // },
  // {
  //   path: "/stuAnswer",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "stuAnswer",
  //       component: () => import("@/views/stuAnswer/index"),
  //       meta: { title: "学生端作业情况", icon: "el-icon-s-help" }
  //     }
  //   ]
  // },

  /* 
    params传参修改
  */
    
  
    /* 
      params传参修改结束2021年9月6日 17:18:31
    */
  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true }
];

export const asyncRoutes = [
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    meta: {
      title: "课程管理",
      icon: "nested",
      roles: ['Teacher','Maintainer'],
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"),
        name: "Menu1",
        meta: { title: "新建课程" ,roles: ['Teacher','Maintainer']}
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        name: "Menu2",
        meta: { title: "课程班级管理" ,roles: ['Teacher','Maintainer']}
      },
      {
        path: "menu3",
        component: () => import("@/views/nested/menu3/index"),
        name: "Menu3",
        meta: { title: "课程试卷管理",roles: ['Teacher','Maintainer'] }
      }
    ]
  },
  {
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "作业编制", icon: "dashboard",roles: ['Teacher','Maintainer'], keepAlive: true } //此组件需要缓存
      }
    ]
  },

  {
    path: "/table",
    component: Layout,
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "题库管理", icon: "el-icon-s-help" ,roles: ['Teacher','Maintainer']}
      }
    ]
  },

  {
    path: "/form",
    component: Layout,
    redirect: "/form/class",
    meta: {
      title: "班级管理",
      icon: "form",
      roles: ['Teacher','Maintainer'],
    },
    children: [
      {
        path: "class",
        name: "Class",
        component: () => import("@/views/form/class/index"),
        meta: { title: "新建班级",roles: ['Teacher','Maintainer'],}
      },
      {
        path: 'student',
        name: "student",
        component: () => import("@/views/form/student/index"),
        meta: { title: "学生管理" ,roles: ['Teacher','Maintainer'],}
      }
    ]
  },
  {
    path: "/teacherhomework",
    /*  redirect: '/tree', */
    component: Layout,
    meta: {
      title: '教师作业管理',
      icon: 'lock',
      roles: ['Teacher','Maintainer'] // you can set roles in root nav
    },
    children: [
      {
        path: "/teacherhomework",
        name: "/Teacherhomework",
        component: () => import("@/views//teacherhomework/index0"),
        meta: { title: "教师作业管理", icon: "link" , roles: ['Teacher','Maintainer']}
      },
    ]
  },
  {
    path: "/teacherhomework1",
    /*  redirect: '/tree', */
    component: Layout,
    meta: {
      title: '教师作业管理',
      icon: 'lock',
      roles: ['Teacher','Maintainer'] // you can set roles in root nav
    },
    hidden:true,
    children: [
      {
        path: "/teacherhomework1",
        name: "/Teacherhomework1",
        component: () => import("@/views//teacherhomework/index1"),
        meta: {  roles: ['Teacher','Maintainer']},
        hidden:true
      },
    ]
  },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "xSheng",
        name: "xSheng",
        component: () => import("@/views/xSheng/index0"),
        meta: { title: "学生端作业情况", icon: "el-icon-s-help", roles: ['Student','Maintainer']}
      }
    ]
  },
  {
    path: "/tree",
    /*  redirect: '/tree', */
    component: Layout,
    meta: {
      title: '学生作业管理',
      icon: 'lock',
      roles: ['Student','Maintainer'] // you can set roles in root nav
    },
    children: [
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index0"),
        meta: { title: "学生作业管理", icon: "link" , roles: ['Student','Maintainer']}
      },
    ]
  },
  {
    path: "",
    component: Layout,
    children: [
      { 
        name:'stuDati',
        path: "stuDati/:id",
        component: () => import("@/views/dati/index"),
        meta: { title: "答题", icon: "link" , roles: ['Student','Maintainer']}
      }
    ],
    hidden:true
  },
  {
    path: "",
    component: Layout,
    children: [
      { 
        name:'stuAnswer',
        path: "stuAnswer/:id",
        component: () => import("@/views/stuAnswer/index"),
        meta: { title: "答案", icon: "link" , roles: ['Student','Maintainer']}
      }
    ],
    hidden:true
  },
]

asyncRoutes.push({
  path: "*", redirect: "/404", hidden: true
})

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
