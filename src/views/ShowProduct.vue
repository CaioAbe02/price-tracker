<template>
    <div class="product" v-if="product">
        <div class="product_infos">
            <h1 class="product_name">{{ product.name }}</h1>
            <span class="product_original_price">R${{ product.original_price.toFixed(2) }}</span>
            <span class="product_discount" :style="{ color: getColor() }">{{ getDiscount() }}</span>
            <span class="product_price" :style="{ color: getColor() }">R${{ product.new_prices.slice(-1)[0].toFixed(2) }}</span>
        </div>
        <div class="graph">
            <canvas id="myChart"></canvas>
        </div>
        <button @click="addProduct(product)">Add product</button>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import Chart from 'chart.js/auto';
import IProduct from '@/interfaces/IProduct';

export default defineComponent({
    name: 'ShowProduct',
    props: {
        id: {
            type: Number,
        }
    },
    data() {
        return {
            product: this.getProduct(this.id),
            myProducts: [] as number[]
        }
    },
    methods: {
        getProduct(id: number) {
            return this.products.find(prod => prod.id == id)
        },
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
        },
        addProduct(product: IProduct) {
            this.myProducts.push(product.id)
            this.saveProducts()
        },
        saveProducts() {
            const parsed = JSON.stringify(this.myProducts)
            localStorage.setItem('myProductsIds', parsed)
        },
    },
    setup() {
        const store = useStore()

        return {
            products: computed(() => store.state.products),
            store
        }
    },
    mounted() {
        // Graph
        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'line',
            data: {
            labels: this.product.new_prices_dates,
            datasets: [{
                label: 'Price',
                data: this.product.new_prices,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
            },
        });

        // Local Storage
        if(localStorage.getItem('myProductsIds')) {
            try {
                this.myProducts = JSON.parse(localStorage.getItem('myProductsIds') || '')
            }
            catch(e) {
                localStorage.removeItem('myProductsIds')
            }
        }
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

.graph {
    width: 1000px;
    margin: 0 auto;
}
</style>