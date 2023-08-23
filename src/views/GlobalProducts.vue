<template>
    <div class="myproducts_background">
        <GlobalProductsTable />
        <router-link to="/products/new" class="add_product_button">
            <font-awesome
                icon="fa-solid fa-plus"
                class="add_product_icon"
                size=lg
                border
                style="--fa-border-radius: 100%; --fa-border-width: 3px; color: white"
            />
        </router-link>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { computed, defineComponent } from 'vue';
import { GET_PRODUCTS } from '@/store/action-types';
import { useStore } from '@/store';
import MyProduct from '@/components/MyProduct.vue';
import GlobalProductsTable from '@/components/GlobalProductsTable.vue'
import IProduct from '@/interfaces/IProduct';

export default defineComponent({
    name: 'Products',
    components: {
        MyProduct,
        GlobalProductsTable,
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_PRODUCTS)

        return {
            products: computed(() => store.state.products),
            store
        }
    },
})
</script>

<style scoped>
th, td {
    color: white;
}
.myproducts_background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.products {
    width: 500px;
    margin-left: 200px;

    display: flex;
    flex-direction: column;
    justify-content: center;
}

.add_product_button {
    position: fixed;
    right: 2%;
    bottom: 2%;
}
</style>