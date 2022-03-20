import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/compat/app'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main', auth: true },
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/History.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Categories.vue')
  }, 
  {
    path: '/detail-record/:id',
    name: 'Detail-record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Detail-record.vue')
  }, 
  {
    path: '/planing',
    name: 'Planing',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Planing.vue')
  }, 
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue')
  }, 
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main', auth: true   },
    component: () => import('../views/Record.vue')
  }, 
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: { layout: 'empty' },
    component: () => import('../views/Registration.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }

})

export default router
