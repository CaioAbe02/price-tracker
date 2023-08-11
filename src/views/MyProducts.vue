<template>
    <div class="myproducts_background">
        <div class="products">
            <MyProduct v-for="product in products.filter((product) => myProductsIds.includes(product.id))" :key="product.id" :product="product"/>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import MyProduct from '@/components/MyProduct.vue';
import { useStore } from '@/store';
import { GET_PRODUCTS } from '@/store/action-types';

export default defineComponent({
    name: 'MyProducts',
    components: {
        MyProduct,
    },
    data() {
        return {
            myProductsIds: [] as number[],
        }
    },
    mounted() {
        if(localStorage.getItem('myProductsIds')) {
            try {
                this.myProductsIds = JSON.parse(localStorage.getItem('myProductsIds') || '')
            }
            catch(e) {
                localStorage.removeItem('myProductsIds')
            }
        }
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
</style>