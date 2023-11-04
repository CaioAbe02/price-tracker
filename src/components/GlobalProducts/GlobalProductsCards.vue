<template>
    <div class="cards">
        <GlobalProductsCard v-for="product in products" :key="product.id" :product="product"/>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { PropType, defineComponent } from 'vue';
import IProduct from '@/interfaces/IProduct';
import GlobalProductsCard from './GlobalProductsCard.vue';

export default defineComponent ({
    name: 'GlobalProductsCards',
    props: {
        products: {
            required: true,
            type: Array as PropType<IProduct[]>,
        }
    },
    components: { GlobalProductsCard }
})
</script>

<style scoped>

</style>