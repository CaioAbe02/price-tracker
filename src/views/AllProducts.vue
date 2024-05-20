<template>
    <h1>Products</h1>
    <div class="products">
        <ProductCard v-for="product in products" v-key="product.id" :product="product" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { productsStore } from '../store';
import ProductCard from '../components/AllProducts/ProductCard.vue';

export default defineComponent({
    name: 'AllProducts',
    components: {
        ProductCard
    },
    setup() {
        const store = productsStore()

        return {
            store,
            products: computed(() => store.$state.products)
        }
    }
})
</script>

<style scoped>

</style>../../store../store