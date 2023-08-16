<template>
    <div class="product" v-if="product">
        <ProductInfos :product="product" />
        <div class="graph">
            <canvas id="myChart"></canvas>
        </div>
        <button @click="addOrRemoveProduct(product)" class="add_product_button">{{ buttonText }}</button>
        <h1 class="product_name">{{ product.id }}</h1>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import Chart from 'chart.js/auto';
import IProduct from '@/interfaces/IProduct';
import ProductInfos from '@/components/ShowProduct/ProductInfos.vue'

export default defineComponent({
    name: 'ShowProduct',
    components: {
        ProductInfos,
    },
    props: {
        id: {
            type: Number,
        }
    },
    data() {
        return {
            myProducts: [] as number[],
            isProductFavorite: false
        }
    },
    methods: {
        addOrRemoveProduct(product: IProduct) {
            if (this.myProducts.includes(this.product.id)) {
                this.myProducts = this.myProducts.filter(prod => prod !== product.id) // remove
            }
            else {
                this.myProducts.push(product.id) // add
            }
            this.saveProducts()
        },
        saveProducts() {
            const parsed = JSON.stringify(this.myProducts)
            localStorage.setItem('myProductsIds', parsed)
        },
    },
    computed: {
        buttonText() {
            console.log(this.myProducts.includes(this.product.id))
            if (this.myProducts.includes(this.product.id)) {
                return "Remove product"
            }
            return "Add product"
        },
        product(): IProduct {
            return this.products.find(prod => prod.id == this.id)!
        }
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
.graph {
    width: 1000px;
    margin: 0 auto;
}

.add_product_button {
    color: white;
}
</style>