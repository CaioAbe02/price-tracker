<template>
    <SearchInput @inputSearchQuery="setSearchQuery" />
    <GlobalProductsTable :products="filteredProducts" />
    <router-link to="/products/new" class="add_product_button">
        <font-awesome icon="fa-solid fa-plus" class="add_product_icon" size=lg border
            style="--fa-border-radius: 100%; --fa-border-width: 3px; color: white" />
    </router-link>
</template>

<script lang="ts">
/* eslint-disable */

import { computed, defineComponent } from 'vue';
import { GET_PRODUCTS } from '@/store/action-types';
import { useStore } from '@/store';
import MyProduct from '@/components/MyProduct.vue';
import GlobalProductsTable from '@/components/GlobalProductsTable.vue'
import IProduct from '@/interfaces/IProduct';
import SearchInput from '@/components/SearchInput.vue';

export default defineComponent({
    name: 'Products',
    components: {
        MyProduct,
        GlobalProductsTable,
        SearchInput,
    },
    data() {
        return {
            searchQuery: '',
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_PRODUCTS)

        return {
            products: computed(() => store.state.products),
            store
        }
    },
    methods: {
        setSearchQuery(searchQuery: string) {
            this.searchQuery = searchQuery
        }
    },
    computed: {
        filteredProducts(): IProduct[] {
            if (this.searchQuery == '') {
                return this.products
            }

            const searchItems = this.searchQuery.toLowerCase().split(' ')

            console.log(
                this.products.filter(product => {
                    return searchItems.some(item => {
                        return product.name.toLowerCase().includes(item)
                    })
                })
            )
            console.log("------")

            return this.products.filter(product => {
                return searchItems.every(item => {
                    return product.name.toLowerCase().includes(item) ||
                    product.tags.toLocaleLowerCase().includes(item)
                })
            })
        }
    },
})
</script>

<style scoped>
.add_product_button {
    position: fixed;
    right: 2%;
    bottom: 2%;
}
</style>