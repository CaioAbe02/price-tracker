import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AllProducts from '../views/AllProducts.vue';
import Product from '../views/Product.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/products',
    name: 'AllProducts',
    component: AllProducts,
  },
  {
    path: '/products/:id',
    name: 'ShowProduct',
    component: Product,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
