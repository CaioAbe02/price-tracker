<template>
    <div class="products">
        <SearchInput @inputSearchQuery="setSearchQuery" class="search"/>
        <div class="tags_filter" v-if="searchTag.length">
            <TagsFilter :tags="searchTag" @removeTag="removeSearchTag"/>
        </div>
        <GlobalProductsTable :products="filteredProducts" @searchTagQuery="addSearchTag" v-if="windowWidth > 850"/>
        <GlobalProductsCards :products="filteredProducts" v-if="windowWidth <= 850"/>
    </div>
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
import TagsFilter from '@/components/GlobalProducts/TagsFilter.vue';
import IProduct from '@/interfaces/IProduct';

export default defineComponent({
    name: 'Products',
    components: {
    MyProduct,
    GlobalProductsTable,
    GlobalProductsCards,
    SearchInput,
    TagsFilter
},
    data() {
        return {
            searchQuery: '',
            searchTag: [] as string[],
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
        addSearchTag(tag: string) {
            if (!this.searchTag.includes(tag)) {
                this.searchTag.push(tag)
            }
        },
        removeSearchTag(tag: string) {
            const index = this.searchTag.indexOf(tag, 0)

            if (index > -1) {
                this.searchTag.splice(index, 1)
            }
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        }
    },
    computed: {
        filteredProducts(): IProduct[] {
            if (this.searchQuery == '' && this.searchTag.length == 0 ) {
                return this.products
            }

            const searchItems = this.searchQuery.toLowerCase().split(' ')

            return this.products
                .filter(product => {
                    return searchItems.every(item => {
                        return product.name.toLowerCase().includes(item) ||
                        product.tags.toLocaleLowerCase().includes(item)
                    })
                })
                .filter(product => {
                    return this.searchTag.every(tag => {
                        return product.tags.includes(tag)
                    })
                })
        }
    },
})
</script>

<style scoped>
.products {
    margin: 0 150px;
}

.tags_filter {
    display: flex;
    align-items: center;

    margin-bottom: 10px;
}

.tags_text {
    color: white;
    margin-right: 15px;
}
</style>