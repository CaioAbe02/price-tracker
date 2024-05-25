<template>
    <main>
        <h1>Products</h1>
        <aside class="filters">
            <h2>Filters</h2>
            <section class="filters_checkboxes">
                <h3>Stores</h3>
                <CheckboxInput v-model="filter_amazon" label="Amazon" :initiate_checked="true"/>
                <CheckboxInput v-model="filter_kabum" label="Kabum" :initiate_checked="true"/>
                <CheckboxInput v-model="filter_mercado_livre" label="Mercado Livre" :initiate_checked="true"/>
            </section>
            <section class="filters_checkboxes">
                <h3>Prices</h3>
                <CheckboxInput v-model="filter_best_prices" label="Best Prices" :initiate_checked="true"/>
                <CheckboxInput v-model="filter_low_prices" label="Low Prices" :initiate_checked="true"/>
                <CheckboxInput v-model="filter_same_prices" label="Same Prices" :initiate_checked="true"/>
                <CheckboxInput v-model="filter_high_prices" label="High Prices" :initiate_checked="true"/>
                <CheckboxInput v-model="filter_unavailable_prices" label="Unavailable Prices" :initiate_checked="true"/>
            </section>
        </aside>
        <section class="search">
            <input type="search" placeholder="Search products..." v-model="search_query" class="search_input">
        </section>
        <section class="sort">
            <span>Sort by</span>
            <SelectInput :options="sort_options" v-model="sort_by"/>
            <span>Order</span>
            <SelectInput :options="sort_orders" v-model="sort_order"/>
        </section>
        <section class="products">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { productsStore } from '../store';
import { getDiscount, lowestPrice } from '../utils';
import ProductCard from '../components/AllProducts/ProductCard.vue';
import SelectInput from '../components/Inputs/SelectInput.vue';
import CheckboxInput from '../components/Inputs/CheckboxInput.vue';
import IProduct from '../interfaces/IProduct';
import IOption from '../interfaces/IOption';

export default defineComponent({
    name: 'AllProducts',
    components: {
        ProductCard,
        SelectInput,
        CheckboxInput
    },
    data() {
        return {
            search_query: '',
            sort_by: 'name',
            sort_order: 'asc',
            filter_amazon: true,
            filter_kabum: true,
            filter_mercado_livre: true,
            filter_best_prices: true,
            filter_low_prices: true,
            filter_same_prices: true,
            filter_high_prices: true,
            filter_unavailable_prices: true
        }
    },
    setup() {
        const store = productsStore()

        const sort_options: IOption[] = [
            { value: 'name', label: 'Name' },
            { value: 'price', label: 'Price' },
            { value: 'discount', label: 'Discount' }
        ]

        const sort_orders: IOption[] = [
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' }
        ]

        return {
            store,
            products: computed(() => store.$state.products),
            sort_options,
            sort_orders
        }
    },
    methods: {
        isLowestPrice(product: IProduct) : boolean {
            return (lowestPrice(product) === product.new_prices.slice(-1)[0])
        }
    },
    computed: {
        sortedProducts(): IProduct[] {
            const products = [...this.products]
            return products.sort((product1, product2) => {
                let item1: any , item2: any

                if (this.sort_by == 'name') {
                    item1 = product1.name.toLowerCase()
                    item2 = product2.name.toLowerCase()
                }
                else if (this.sort_by == 'price') {
                    item1 = product1.available ? product1.new_prices.slice(-1)[0] : 99999
                    item2 = product2.available ? product2.new_prices.slice(-1)[0] : 99999
                }
                else if (this.sort_by == 'discount') {
                    item1 = product1.available ? parseFloat(getDiscount(product1)) : 99999
                    item2 = product2.available ? parseFloat(getDiscount(product2)) : 99999
                }

                if (this.sort_order === 'asc') {
                    return item1 > item2 ? 1 : item1 < item2 ? -1 : 0;
                }
                else {
                    return item1 < item2 ? 1 : item1 > item2 ? -1 : 0;
                }
            })
        },
        filteredProducts(): IProduct[] {
            let products: IProduct[] = this.sortedProducts

            products = products.filter(product => {
                if (this.filter_amazon && product.name.toLowerCase().includes("amazon")) return true
                if (this.filter_kabum && product.name.toLowerCase().includes("kabum")) return true
                if (this.filter_mercado_livre && product.name.toLowerCase().includes("mercado livre")) return true
            })

            products = products.filter(product => {
                const discount = product.available ? parseFloat(getDiscount(product)) : -1
                if (this.filter_best_prices && this.isLowestPrice(product) && discount !== 0 && product.available) return true
                if (this.filter_low_prices && discount < 0 && product.available && !this.isLowestPrice(product)) return true
                if (this.filter_same_prices && discount === 0 && product.available) return true
                if (this.filter_high_prices && discount > 0 && product.available) return true
                if (this.filter_unavailable_prices && !product.available) return true
                return false;
            })

            if (this.search_query !== '') {
                products = products.filter(product => product.name.toLowerCase().includes(this.search_query.toLowerCase()))
            }

            return products
        }
    }
})
</script>

<style scoped>
    main {
        display: grid;
        grid-template-areas:
            'title title'
            'filters search'
            'filters sort'
            'filters products';
        grid-template-columns: 25% 1fr;

        margin: 0 5%;
    }

    h1 {
        grid-area: title;

        margin-bottom: 16px;
    }

    .filters {
        grid-area: filters;

        padding-right: 32px;
    }

        .filters h2 {
            padding-bottom: 16px;
            border-bottom: 1px solid var(--product-tag-separator);

            font-size: 20px;
            font-weight: normal;
        }

        .filters h3 {
            padding-bottom: 16px;

            font-size: 18px;
            font-weight: normal;
        }

        .filters_checkboxes {
            display: flex;
            flex-direction: column;
            row-gap: 4px;

            padding: 16px 0;
            border-bottom: 1px solid var(--product-tag-separator);
        }

    .search {
        grid-area: search;

        margin-bottom: 8px;
    }

        .search_input {
            width: 100%;

            font-size: 16px;
            color: var(--product-tag-color);

            background-color: var(--input-color);

            padding: 16px;
            border: 1px solid var(--input-color);
            border-radius: 8px;
            outline: none;

            &:focus {
                border: 1px solid var(--white);

                transition: border 0.2s ease;
            }

            &::placeholder {
                transition: color 0.2s ease;
            }

            &:hover::placeholder {
                color: var(--white);
            }

            &:focus::placeholder {
                color: var(--white);
            }
        }

    .sort {
        grid-area: sort;

        display: flex;
        align-items: center;
        column-gap: 8px;
    }

    .products {
        grid-area: products;

        display: flex;
        flex-direction: column;
        row-gap: 8px;

        margin-top: 16px;
    }
</style>