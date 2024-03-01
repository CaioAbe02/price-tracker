<template>
    <div class="products">
        <SearchInput @inputSearchQuery="setSearchQuery" class="search"/>
        <div class="tags_filter_section">
            <button @click="tagsSearchWindow()" class="tags_filter_button">
                Add tags
                <font-awesome
                    icon="fa-solid fa-chevron-down"
                    size=sm
                    class="tags_filter_button_icon"
                    v-if="!isTagsSearchWindowOpen"
                />
                <font-awesome
                    icon="fa-solid fa-chevron-up"
                    size=sm
                    class="tags_filter_button_icon"
                    v-if="isTagsSearchWindowOpen"
                />
            </button>
            <TagsFilter :tags="searchTags" @removeTag="removesearchTags"/>
        </div>
        <TagsSearch
            :tags_props="searchTags"
            :position="'absolute'"
            class="tags_filter_window"
            :class="isTagsSearchWindowOpen ? 'tags_filter_window_on' : 'tags_filter_window_off'"
        />
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
import SearchInput from '@/components/GlobalProducts/SearchInput.vue';
import TagsFilter from '@/components/GlobalProducts/TagsFilter.vue';
import TagsSearch from '@/components/TagsSearch.vue'
import IProduct from '@/interfaces/IProduct';
import IProductTag from '@/interfaces/IProductTag';

export default defineComponent({
    name: 'Products',
    components: {
    MyProduct,
    GlobalProductsTable,
    GlobalProductsCards,
    SearchInput,
    TagsFilter,
    TagsSearch
},
    data() {
        return {
            searchQuery: '',
            searchTags: [] as IProductTag[],
            isTagsSearchWindowOpen: false,
            windowWidth: window.innerWidth
        }
    },
    setup() {
        const store = useStore()

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
        addsearchTags(tag: IProductTag) {
            if (!this.searchTags.includes(tag)) {
                this.searchTags.push(tag)
            }
        },
        removesearchTags(tag: IProductTag) {
            const index = this.searchTags.indexOf(tag, 0)

            if (index > -1) {
                this.searchTags.splice(index, 1)
            }
        },
        tagsSearchWindow() {
            this.isTagsSearchWindowOpen = !this.isTagsSearchWindowOpen
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
                .filter(product => {
                    return searchItems.every(item => {
                        return product.name.toLowerCase().includes(item) ||
                        product.tags.some(tag => tag.name.includes(item))
                    })
                })
                .filter(product => {
                    return this.searchTags.every(searchTag => {
                        return product.tags.some(tag => tag.name.includes(searchTag.name))
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

.tags_filter_section {
    display: flex;
    column-gap: 10px;

    margin-bottom: 10px;
}

.tags_filter_button {
    background-color: var(--purple);

    padding: 7px 15px;
    border-width: 0px;
    border-radius: 5px;

    cursor: pointer;

    transition: all 0.3s ease-in;
}

.tags_filter_button:hover {
    background-color: var(--purple-dark);
}

.tags_filter_button_icon {
    color: var(--background-color);
}


.tags_filter_window {
    width: 30%;
}

.tags_filter_window_on {
    animation: slide_down 0.4s ease;
    display: block;
}

.tags_filter_window_off {
    animation: slide_up 0.4s ease;

    display: none;

    transition:
        display 0.4s allow-discrete;
}

@keyframes slide_down {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes slide_up {
    0% {
        opacity: 1;
        transform: translateY(0px);
    }

    100% {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.tags_text {
    color: white;
    margin-right: 15px;
}
</style>