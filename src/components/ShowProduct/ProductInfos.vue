<template>
    <div class="product_infos">
        <h1 class="product_name">{{ product.name }}</h1>
        <span class="product_original_price">R${{ product.original_price.toFixed(2) }}</span>
        <span class="product_discount" :style="{ color: getColor() }">{{ getDiscount() }}</span>
        <span class="product_price" :style="{ color: getColor() }">R${{ product.new_prices.slice(-1)[0].toFixed(2) }}</span>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import IProduct from '../../interfaces/IProduct';

export default defineComponent({
    name: 'ProductInfos',
    props: {
        product: {
            required: true,
            type: Object as ()=>IProduct
        }
    },
    methods: {
        getDiscount(): string {
            const new_price = this.product.new_prices.slice(-1)[0]
            const original_price = this.product.original_price
            const discount = (100 - (original_price / new_price) * 100).toFixed(2)

            if (new_price > original_price) {
                return (`+${discount}%`)
            }
            else if (new_price < original_price) {
                return (`${discount}%`)
            }
            else {
                return "0%"
            }
        },
        getColor(): string {
            const difference = this.product.new_prices.slice(-1)[0] - this.product.original_price

            if (difference > 0) {
                return '#D82E3F'
            }
            else if (difference < 0) {
                return '#28CC2D'
            }
            else {
                return '#FFE135'
            }
        },
    }
})
</script>

<style scoped>
.product_infos {
    display: grid;
    grid-template-areas:
        'name name'
        'original_price discount'
        'new_price new_price';
    justify-content: center;
    justify-items: center;
}
.product_name {
    grid-area: name;

    color: white;
}

.product_original_price {
    grid-area: original_price;

    color: white;
}

.product_discount {
    grid-area: discount;
}

.product_price {
    grid-area: new_price;
}
</style>