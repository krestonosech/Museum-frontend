import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/Events.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/excursions',
    name: 'excursions',
    component: () => import('../views/Excursions.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about-museum',
    name: 'about-museum',
    component: () => import('../views/AboutMuseum.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/etnozoo',
    name: 'etnozoo',
    component: () => import('../views/Etnozoo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/News.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/news/:id',
    name: 'news-item',
    component: () => import('../views/NewsItemPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/path-to-museum',
    name: 'path-to-museum',
    component: () => import('../views/PathToMuseum.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/review',
    name: 'review',
    component: () => import('../views/Review.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/work-time',
    name: 'work-time',
    component: () => import('../views/WorkTime.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
