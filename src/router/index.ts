import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import MyProducts from '@/views/MyProducts.vue';
import GlobalProducts from '@/views/GlobalProducts.vue';
import ShowProduct from '@/views/ShowProduct.vue';
import AddProduct from '@/views/AddProduct.vue';
import UpdateProducts from '@/views/UpdateProducts.vue';
import EditProduct from '@/views/EditProduct.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MyProducts',
    component: MyProducts,
  },
  {
    path: '/products',
    name: 'GlobalProducts',
    component: GlobalProducts,
  },
  {
    path: '/products/:id',
    name: 'ShowProduct',
    component: ShowProduct,
    props: true,
  },
  {
    path: '/products/new',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/products/update',
    name: 'UpdateProduct',
    component: UpdateProducts,
  },
  {
    path: '/products/edit/:id',
    name: 'EditProduct',
    component: EditProduct,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
