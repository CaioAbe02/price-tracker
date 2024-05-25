import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AllProducts from '../views/AllProducts.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/products',
    name: 'AllProducts',
    component: AllProducts,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
