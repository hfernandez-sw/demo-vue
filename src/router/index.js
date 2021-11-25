import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Signout from '@/views/Signout.vue';
import VueJwtDecode from 'vue-jwt-decode';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "private" */ '@/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/signout',
    name: 'Signout',
    component: Signout,
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import(/* webpackChunkName: "private" */ '@/views/Success.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

const publicPages = routes
  .filter((each) => each.meta.requiresAuth === false)
  .map((each) => each.path);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  publicPages
});

router.beforeEach((to, from, next) => {
  const publicPages = router.options.publicPages;
  const userdata = window.localStorage.getItem('userdata');
  const usertoken = window.localStorage.getItem('usertoken');

  if (publicPages.includes(to.path)) {
    next();
    return;
  }

  if (userdata) {
    const decoded = VueJwtDecode.decode(userdata);

    if (decoded !== null && decoded.exp > new Date().getTime() / 1000 && usertoken) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `${usertoken}`;
    }

    // user authenticated?
    if (decoded !== null && decoded.exp > new Date().getTime() / 1000) {
      next();
      return;
    } else {
      router.push({
        name: 'Login'
      });
      return;
    }
  } else {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = null;
    router.push({
      name: 'Login'
    });
    return;
  }
});

export default router;
