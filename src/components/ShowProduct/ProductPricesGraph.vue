<template>
    <div class="graph">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import IProduct from '@/interfaces/IProduct';
import Chart from 'chart.js/auto';

export default defineComponent({
    name: 'ProductPricesGraph',
    props: {
        product: {
            required: true,
            type: Object as () => IProduct
        }
    },
    mounted() {
        if (this.product) {
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
        }
    }
})
</script>

<style scoped>
.graph {
    width: 1000px;
    margin: 0 auto;
}
</style>