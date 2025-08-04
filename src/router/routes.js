const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {needsLogIn: true},
    children: [
      {
        path: '',
        component: () => import('src/pages/MainPage.vue')

      }
    ]
  },

  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {onlyLoggedOut : true},
    children: [
      {
        path: '',
        component: () => import('src/pages/LoginPage.vue')

      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
