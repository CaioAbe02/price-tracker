<template>
    <main v-if="product">
        {{ product.name }}
    </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { productsStore } from '../store';

export default defineComponent({
    name: 'Product',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const products_store = productsStore()

        return {
            product: computed(() => products_store.$state.products.filter((product) => product.id === parseInt(props.id))[0]),
        }
    }
})
</script>

<style scoped>

</style>