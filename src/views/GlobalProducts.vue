<template>
    <SearchInput @inputSearchQuery="setSearchQuery" />
    <GlobalProductsTable :products="filteredProducts" v-if="windowWidth > 850"/>
    <GlobalProductsCards :products="filteredProducts" v-if="windowWidth <= 850"/>
</template>

<script lang="ts">
/* eslint-disable */

import { computed, defineComponent } from 'vue';
import { GET_PRODUCTS } from '@/store/action-types';
import { useStore } from '@/store';
import MyProduct from '@/components/MyProduct.vue';
import GlobalProductsTable from '@/components/GlobalProducts/GlobalProductsTable.vue'
import GlobalProductsCards from '@/components/GlobalProducts/GlobalProductsCards.vue'
import SearchInput from '@/components/SearchInput.vue';
import IProduct from '@/interfaces/IProduct';

export default defineComponent({
    name: 'Products',
    components: {
        MyProduct,
        GlobalProductsTable,
        GlobalProductsCards,
        SearchInput,
    },
    data() {
        return {
            searchQuery: '',
            windowWidth: window.innerWidth
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
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        setSearchQuery(searchQuery: string) {
            this.searchQuery = searchQuery
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        }
    },
    computed: {
        filteredProducts(): IProduct[] {
            if (this.searchQuery == '') {
                return this.products
            }

            const searchItems = this.searchQuery.toLowerCase().split(' ')

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
</style>