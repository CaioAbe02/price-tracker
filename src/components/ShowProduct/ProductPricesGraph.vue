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
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            ticks: {
                                color: 'rgba(255, 255, 255, 1)'
                            },
                            grid: {
                                color: 'rgba(100, 100, 100, 0.1)'
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(100, 100, 100, 0.1)'
                            }
                        }
                    }
                },
                data: {
                    labels: this.product.new_prices_dates,
                    datasets: [{
                        label: 'Price',
                        fill: true,
                        data: this.product.new_prices,
                        borderColor: '#CCCCFF',
                        backgroundColor: 'rgba(204, 204, 255, 0.1)',
                        tension: 0.4,
                        pointBackgroundColor: 'white',
                        pointRadius: 3,
                    }]
                },
            });
        }
    }
})
</script>

<style scoped>
.graph {
    display: flex;
    justify-content: center;

    margin: 0 auto;
}
</style>