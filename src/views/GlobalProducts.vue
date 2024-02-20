<template>
    <div class="products">
        <SearchInput @inputSearchQuery="setSearchQuery" class="search"/>
        <div class="tags_filter" v-if="searchTags.length">
            <TagsFilter :tags_ids="searchTags" @removeTag="removesearchTags"/>
        </div>
        <GlobalProductsTable :products="filteredProducts" @searchTagQuery="addsearchTags" v-if="windowWidth > 850"/>
        <GlobalProductsCards :products="filteredProducts" v-if="windowWidth <= 850"/>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { computed, defineComponent } from 'vue';
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
            searchTags: [] as number[],
            windowWidth: window.innerWidth
        }
    },
    setup() {
        const store = useStore()

        return {
            products: computed(() => store.state.products),
            tags: computed(() => store.state.tags),
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
        addsearchTags(tag: number) {
            if (!this.searchTags.includes(tag)) {
                this.searchTags.push(tag)
            }
        },
        removesearchTags(tag: number) {
            const index = this.searchTags.indexOf(tag, 0)

            if (index > -1) {
                this.searchTags.splice(index, 1)
            }
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        }
    },
    computed: {
        filteredProducts(): IProduct[] {
            if (this.searchQuery == '' && this.searchTags.length == 0 ) {
                return this.products
            }

            const searchItems = this.searchQuery.toLowerCase().split(' ')

            return this.products
                // .filter(product => {
                //     return searchItems.every(item => {
                //         return product.name.toLowerCase().includes(item) ||
                //         this.tags.filter(tag => tag.products_ids.includes(product.id)).some(tag => tag.name.includes(item))
                //     })
                // })
                .filter(product => {
                    return this.searchTags.every(searchTag => {
                        return this.tags.filter(tag => tag.products_ids.includes(product.id)).some(tag => tag.id == searchTag)
                    })
                })
        }
    },
})
</script>

<style scoped>
.products {
    margin: 0 5%;
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