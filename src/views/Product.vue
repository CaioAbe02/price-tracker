<template>
    <main v-if="product">
        <h1>{{ product.name }}</h1>
        <div class="price_and_filters">
            <div class="price_info">
                <span class="current_price">R${{ currentPrice }}</span>
                <span>R${{ priceDifference }}</span>
            </div>
            <div class="filters">
                <div
                    v-for="filter in filter_options"
                    :key="filter.value"
                    class="filter"
                    :class="filter.value === filter_picked ? 'filter_checked' : ''"
                    @click="filter_picked = filter.value"
                >
                    <input type="radio" :value="filter.value" v-model="filter_picked">
                    <label>{{ filter.label }}</label>
                </div>
            </div>
        </div>
        <div class="graph">
            <Line :data="chartData" :options="chart_options" />
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { productsStore } from '../store';
import IOption from '../interfaces/IOption';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

export default defineComponent({
    name: 'Product',
    components: {
        Line
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const products_store = productsStore()

        const filter_options: IOption[] = [
            { value: '1w', label: '1 Week' },
            { value: '1m', label: '1 Month' },
            { value: '3m', label: '3 Months' },
            { value: '6m', label: '6 Months' },
            { value: '1y', label: '1 Year' },
            { value: 'all', label: 'All' },
        ]

        return {
            product: computed(() => products_store.$state.products.filter((product) => product.id === parseInt(props.id))[0]),
            filter_options
        }
    },
    data() {
        return {
            filter_picked: 'all',
            chart_options: {
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
                        },
                        ticks: {
                            callback: function(value: any) {
                                return 'R$ ' + value
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context: any) {
                                let label = context.dataset.label || '';

                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            }
        }
    },
    computed: {
        currentPrice(): string {
            return this.product.new_prices.slice(-1)[0].toFixed(2)
        },
        priceDifference(): string {
            const difference = Math.abs(parseFloat(this.currentPrice) - this.product.original_price).toFixed(2)
            const percentage = Math.abs(100 - (this.product.original_price / parseFloat(this.currentPrice)) * 100).toFixed(2)
            return `${difference} (${percentage}%)`
        },
        chartData() {
            const chart_data = {
                labels: this.product.new_prices_dates,
                datasets: [{
                    label: 'Price',
                    data: this.product.new_prices,
                    fill: true,
                    borderColor: '#9494ff',
                    backgroundColor: 'rgba(148, 148, 255, 0.3)',
                    tension: 0.3,
                    pointBackgroundColor: 'white',
                    pointRadius: 3,
                }]
            }
            return chart_data
        }
    }
})
</script>

<style scoped>
main {
    margin: 0 10%;
}

h1 {
    margin-bottom: 8px;
}

.price_and_filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

    .price_info {
        margin-bottom: 8px;
    }
        .current_price {
            font-size: 1.5em;
        }

    .filters {
        display: flex;
        column-gap: 4px;
    }
        .filter {
            padding: 4px 8px;
            border-radius: 4px;

            cursor: pointer;

            transition: all 0.2s ease;

            &:hover {
                background-color: var(--purple);
                color: var(--main-background);
            }
        }

        .filter input {
            display: none;
        }

        .filter label {
            cursor: pointer;
        }

        .filter_checked {
            background-color: var(--purple);
            color: var(--main-background);

            &:hover {
                background-color: var(--purple-dark);
            }
        }
</style>