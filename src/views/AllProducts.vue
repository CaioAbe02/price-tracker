<template>
    <main>
        <h1>Products</h1>
        <aside class="filters">

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
import { getDiscount } from '../utils';
import ProductCard from '../components/AllProducts/ProductCard.vue';
import SelectInput from '../components/SelectInput.vue';
import IProduct from '../interfaces/IProduct';
import IOption from '../interfaces/IOption';

export default defineComponent({
    name: 'AllProducts',
    components: {
        ProductCard,
        SelectInput
    },
    data() {
        return {
            search_query: '',
            sort_by: 'name',
            sort_order: 'asc'
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

                if (this.sort_order == 'asc') {
                    if (item1 > item2) {
                        return 1
                    }
                    if (item1 < item2) {
                        return -1
                    }
                    return 0
                }
                if (item1 < item2) {
                    return 1
                }
                if (item1 > item2) {
                    return -1
                }
                return 0
            })
        },
        filteredProducts(): IProduct[] {
            if (this.search_query == '') {
                return this.sortedProducts
            }

            return this.sortedProducts.filter(product => product.name.toLowerCase().includes(this.search_query.toLowerCase()))
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
    }

    .filters {
        grid-area: filters;

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
    }

    .products {
        grid-area: products;

        display: flex;
        flex-direction: column;
        row-gap: 8px;

        margin-top: 16px;
    }
</style>