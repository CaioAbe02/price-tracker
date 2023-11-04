<template>
    <div class="card">
        <div class="product_name">
            <span>{{ product.name }}</span>
        </div>
        <div class="row">
            <span class="row_title">Original price:</span>
            <span>R${{ original_price.toFixed(2) }}</span>
        </div>
        <div class="row">
            <span class="row_title">Current price:</span>
            <div class="current_price">
                <span :class="getTextColor()">R${{ current_price.toFixed(2) }}</span>
            </div>
        </div>
        <div class="row">
            <span class="row_title">Discount:</span>
            <div class="current_price">
                <span :class="getTextColor()">{{ getDiscount() }}</span>
            </div>
        </div>
        <div class="row">
            <span class="row_title">Tags:</span>
            <div class="current_price">
                <ProductTags :tags="product.tags" class="tags"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import ProductTags from '../ShowProduct/ProductTags.vue'
import IProduct from '@/interfaces/IProduct';

export default defineComponent({
    name: 'GlobalProductCard',
    components: {
        ProductTags,
    },
    props: {
        product: {
            required: true,
            type: Object as ()=> IProduct
        }
    },
    data() {
        return {
            original_price: this.product.original_price,
            current_price: this.product.new_prices.slice(-1)[0],
            lowest_price: Math.min(...this.product.new_prices),
        }
    },
    methods: {
        getDiscount(): string {
            const discount = (100 - (this.original_price / this.current_price) * 100).toFixed(2)

            if (this.current_price >this.original_price) {
                return (`+${discount}%`)
            }
            if (this.current_price < this.original_price) {
                return (`${discount}%`)
            }
            return "0%"
        },
        getTextColor(): string {
            const difference = this.original_price - this.current_price

            if (this.lowest_price == this.current_price && difference != 0) {
                return 'text_yellow'
            }
            else if (difference > 0) {
                return 'text_green'
            }
            else if (difference < 0) {
                return 'text_red'
            }
            return 'text_white'
        },
    },
})
</script>

<style scoped>
.card {
    background-color: var(--card-background);

    padding: 10px;
    margin: 10px;
    border-radius: 10px;
}

.product_name {
    padding-bottom: 10px;
    border-bottom: 2px solid #343b51;
}

.product_name span {
    font-weight: bold;
}

.row {
    display: flex;
    justify-content: space-between;

    padding-top: 7px;
}

.row_title {
    min-width: 120px;
}

.current_price {
    display: flex;
    column-gap: 10px;
}

.tags {
    justify-content: end;
}

.text_red {
    color: var(--red);
}

.text_yellow {
    color: var(--yellow);
}

.text_green {
    color: var(--green);
}

.text_white {
    color: white;
}

span {
    color: white;
}
</style>