<template v-if="product">
    <router-link :to="`/products/${product.id}`" class="product_card">
        <div class="discount_icon">
            <font-awesome
                icon="fa-solid fa-percent"
                size=lg
                border
                style="--fa-border-radius: 100%; --fa-border-width: 3px;"
                :style="{ '--fa-border-color': getColor(), color: getColor() }"
            />
        </div>
        <span class="product_name">{{ product.name }}</span>
        <span class="product_price" :style="{ color: getColor() }">R${{ product.new_prices.slice(-1)[0].toFixed(2) }}</span>
        <span class="product_discount" :style="{ color: getColor() }">{{ getDiscount() }}</span>
    </router-link>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MyProduct',
    props: {
        product: {
            required: true,
            type: Object,
        },
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
            const difference = this.product.new_prices.slice(-1) - this.product.original_price

            if (difference > 0) {
                return '#D82E3F'
            }
            else if (difference < 0) {
                return '#28CC2D'
            }
            else {
                return '#FFE135'
            }
        }
    }
})
</script>

<style scoped>
.product_card {
    display: grid;
    grid-template-areas:
        'icon name name'
        'icon price discount';
    grid-template-columns: auto 120px auto;
    justify-content: left;
    align-items: center;

    padding-top: 10px;

    text-decoration: none;
}

.discount_icon {
    grid-area: icon;
    padding-right: 15px;
}

.product_name {
    grid-area: name;

    color: white;
    font-weight: bold;
}

.product_price {
    grid-area: price;
}

.product_discount {
    grid-area: discount;
}
</style>