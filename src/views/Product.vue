<template>
    <main v-if="product">
        <section class="product_name">
            <h1 @click="goToUrl(product.url)">{{ product.name }}</h1>
            <font-awesome
                icon="fa-arrow-up-right-from-square"
                size=sm
                class="product_name_icon"
            />
        </section>
        <section class="product_graph">
            <div class="price_and_filters">
                <div class="price_info">
                    <span class="current_price product_gray" v-if="!product.available">Product unavailable</span>
                    <span class="current_price" v-if="product.available">R${{ currentPrice }}</span>
                    <div class="price_difference" :class="product_color" v-if="product.available">
                        <font-awesome
                            :icon="priceIcon"
                            size=1x
                            class="product_icon"
                        />
                        <span>R${{ priceDifference }}</span>
                    </div>
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
        </section>
        <section class="product_price_stats">
            <h2>Price Stats</h2>
            <div class="price_stat">
                <span>Lowest Price</span>
                <span class="stat_price">{{ getLowestPrice }}</span>
            </div>
            <div class="price_stat">
                <span>Average Price</span>
                <span class="stat_price">{{ getAveragePrice }}</span>
            </div>
            <div class="price_stat">
                <span>Highest Price</span>
                <span class="stat_price">{{ getHighestPrice }}</span>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { productsStore } from '../store';
import { getColor, getIcon, lowestPrice, highestPrice, averagePrice } from '../utils';
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
    data() {
        return {
            product_color: '',
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
    computed: {
        currentPrice(): string {
            return `${this.product.new_prices.slice(-1)[0].toFixed(2)}`
        },
        priceDifference(): string {
            const difference = Math.abs(parseFloat(this.currentPrice) - this.product.original_price).toFixed(2)
            const percentage = Math.abs(100 - (this.product.original_price / parseFloat(this.currentPrice)) * 100).toFixed(2)
            return `${difference} (${percentage}%)`
        },
        priceIcon(): string {
            this.product_color = getColor(this.product)
            return getIcon(this.product_color)
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
        },
        getLowestPrice(): string {
            return `R$${lowestPrice(this.product).toFixed(2)}`
        },
        getHighestPrice(): string {
            return `R$${highestPrice(this.product).toFixed(2)}`
        },
        getAveragePrice(): string {
            return `R$${averagePrice(this.product).toFixed(2)}`
        },
    },
    methods: {
        goToUrl(url: string) {
            window.open(url, '_blank')
        }
    },
})
</script>

<style scoped>
main {
    display: grid;
    grid-template-areas:
        'name name'
        'graph price_stats'
        'graph price_stats';

    grid-template-columns: 4fr 1fr;
    column-gap: 24px;

    margin: 0 10%;
}

.product_name {
    grid-area: name;

    display: flex;
    align-items: baseline;
    gap: 8px;

    margin-bottom: 24px;
}

    h1 {
        font-size: 1.5em;

        cursor: pointer;
    }

    .product_name_icon {
        cursor: pointer;
    }

.product_graph {
    grid-area: graph;
}

    .price_and_filters {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 16px;
    }

        .price_info {
            display: flex;
            column-gap: 8px;
        }
            .current_price {
                align-self: center;

                font-size: 2em;
                line-height: 1;

                background: 0;
            }

            .price_difference {
                display: flex;
                align-items: flex-end;
                column-gap: 4px;

                background: 0;

                line-height: 1;
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

    .product_price_stats {
        grid-area: price_stats;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }
        .price_stat {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
            .stat_price {
                font-size: 1.2em;
                font-weight: bold;
            }
</style>