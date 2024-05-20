<template>
    <div class="card">
        <font-awesome
            icon="fa-solid fa-arrow-trend-up"
            size=lg
            class="product_icon"
        />
        <span class="product_name">{{ product.name }}</span>
        <div class="product_price_infos">
            <span class="product_current_price">R${{ product.new_prices.slice(-1)[0].toFixed(2) }}</span>
            <span class="product_discount">-10%</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IProduct from '../../interfaces/IProduct';

export default defineComponent({
    name: 'ProductCard',
    props: {
        product: {
            required: true,
            type: Object as ()=>IProduct
        }
    }
})
</script>

<style scoped>
    .card {
        display: grid;
        grid-template-areas:
            'icon name name'
            'icon price price';
        justify-content: start;
        align-items: center;
    }

    .product_icon {
        grid-area: icon;
    }

    .product_name {
        grid-area: name;
    }

    .product_price_infos {
        grid-area: price;
    }

    .product_discount {
        grid-area: discount;
    }
</style>