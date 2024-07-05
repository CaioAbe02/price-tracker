<template>
    <main>
        <h1>Products</h1>
        <aside class="filters">
            <h2>Filters</h2>
            <section class="filters_checkboxes">
                <h3>Stores</h3>
                <CheckboxInput v-model:isChecked="filter_amazon" label="Amazon"/>
                <CheckboxInput v-model:isChecked="filter_kabum" label="Kabum" :initiate_checked="true"/>
                <CheckboxInput v-model:isChecked="filter_mercado_livre" label="Mercado Livre" :initiate_checked="true"/>
            </section>
            <section class="filters_checkboxes">
                <h3>Prices</h3>
                <CheckboxInput v-model:isChecked="filter_best_prices" label="Best Prices" :initiate_checked="true"/>
                <CheckboxInput v-model:isChecked="filter_low_prices" label="Low Prices" :initiate_checked="true"/>
                <CheckboxInput v-model:isChecked="filter_same_prices" label="Same Prices" :initiate_checked="true"/>
                <CheckboxInput v-model:isChecked="filter_high_prices" label="High Prices" :initiate_checked="true"/>
                <CheckboxInput v-model:isChecked="filter_unavailable_prices" label="Unavailable Prices" :initiate_checked="true"/>
            </section>
            <section class="filters_checkboxes filter_tags">
                <h3>Tags</h3>
                <TextInput placeholder="Search tags..." v-model="search_tags" class="search_tags" />
                <div class="tags_checkboxes">
                    <CheckboxInput
                        v-for="filtered_tag in filteredTags"
                        :key="filtered_tag.tag.id"
                        :label="filtered_tag.tag.name"
                        v-model:isChecked="filter_tags_bool[filtered_tag.index]"
                        @click="selectTagToFilter(filtered_tag.tag, filtered_tag.index)"
                    />
                </div>
            </section>
        </aside>
        <section class="search">
            <TextInput placeholder="Search products..." v-model="search_query" class="search_input" />
        </section>
        <section class="tags" v-if="filter_tags.length > 0">
            <div class="tag" v-for="tag in filter_tags" :key="tag.id">
                <span class="tag_name">{{ tag.name }}</span>
                <font-awesome
                    icon="fa-solid fa-xmark"
                    size=sm
                    class="tag_icon"
                    @click="removeTagFromFilter(tag, getIndexTag(tag.id))"
                />
            </div>
        </section>
        <section class="sort">
            <span>Sort by</span>
            <SelectInput :options="sort_options" v-model="sort_by"/>
            <span>Order</span>
            <SelectInput :options="sort_orders" v-model="sort_order"/>
        </section>
        <section class="products">
            <ProductCard
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
                @emit_tag="addTagToFilter"
            />
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { productsStore, tagsStore } from '../store';
import { getDiscount, lowestPrice } from '../utils';
import ProductCard from '../components/AllProducts/ProductCard.vue';
import SelectInput from '../components/Inputs/SelectInput.vue';
import CheckboxInput from '../components/Inputs/CheckboxInput.vue';
import TextInput from '../components/Inputs/TextInput.vue';
import IProduct from '../interfaces/IProduct';
import IOption from '../interfaces/IOption';
import IProductTag from '../interfaces/IProductTag';
import ITag from '../interfaces/ITag';
import IFilterdTag from '../interfaces/IFilteredTag';

export default defineComponent({
    name: 'AllProducts',
    components: {
        ProductCard,
        SelectInput,
        CheckboxInput,
        TextInput
    },
    data() {
        return {
            search_query: '',
            search_tags: '',
            sort_by: 'name',
            sort_order: 'asc',
            filter_amazon: true,
            filter_kabum: true,
            filter_mercado_livre: true,
            filter_best_prices: true,
            filter_low_prices: true,
            filter_same_prices: true,
            filter_high_prices: true,
            filter_unavailable_prices: true,
            filter_tags: [] as IProductTag[],
        }
    },
    setup() {
        const products_store = productsStore()
        const tags_store = tagsStore()

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
            products: computed(() => products_store.$state.products),
            tags: computed(() => tags_store.$state.tags),
            filter_tags_bool: computed(() => tags_store.$state.filter_tags),
            sort_options,
            sort_orders
        }
    },
    methods: {
        isLowestPrice(product: IProduct) : boolean {
            return (lowestPrice(product) === product.new_prices.slice(-1)[0])
        },
        addTagToFilter(tag: IProductTag, index: number) {
            if (!this.filter_tags.some(filter_tag => filter_tag.id === tag.id)) {
                this.filter_tags.push(tag)

                if (index === -1) {
                    this.filter_tags_bool[this.getIndexTag(tag.id)] = true
                }
                else {
                    this.filter_tags_bool[index] = true
                }
                return 1
            }
            return -1
        },
        removeTagFromFilter(tag: IProductTag, index: number) {
            const index_filter_tag = this.filter_tags.findIndex(filter_tag => filter_tag.id === tag.id)

            if (index_filter_tag !== -1) {
                this.filter_tags.splice(index_filter_tag, 1)

                if (index === -1) {
                    this.filter_tags_bool[this.getIndexTag(tag.id)] = false
                }
                else {
                    this.filter_tags_bool[index] = false
                }
                return 1
            }
            return -1
        },
        selectTagToFilter(tag: IProductTag, index: number = -1) {
            const result = this.addTagToFilter(tag, index)

            if (result === -1) {
                this.removeTagFromFilter(tag, index)
            }
        },
        toIProductTag(tag: ITag) {
            const new_tag: IProductTag = {id: tag.id, name: tag.name}
            return new_tag
        },
        isTagInFilter(tag: IProductTag): Boolean {
            return this.filter_tags.some(filter_tag => filter_tag.id === tag.id)
        },
        getIndexTag(tag_id: number) {
            return this.tags.findIndex(tag => tag.id === tag_id)
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

            if (this.filter_tags.length !== 0) {
                products = products.filter(product => {
                    return this.filter_tags.every(filterTag =>
                        product.tags.some(productTag => productTag.id === filterTag.id)
                    )
                })
            }

            return products
        },
        filteredTags(): IFilterdTag[] {
            let filtered_tags: IFilterdTag[] = []

            for (let i in this.tags) {
                const tag = this.tags[i]
                const filterd_tag: IFilterdTag = {
                    tag: {
                        id: tag.id,
                        name: tag.name
                    },
                    index: parseInt(i)
                }
                filtered_tags.push(filterd_tag)
            }

            if (this.search_tags === '') {
                return filtered_tags
            }

            return filtered_tags.filter(filtered_tag => filtered_tag.tag.name.toLowerCase().includes(this.search_tags.toLowerCase()))
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
            'filters tags'
            'filters sort'
            'filters products';
        grid-template-columns: 25% 1fr;
        grid-template-rows: auto 60px minmax(0, auto) 40px auto;

        margin: 0 10%;
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

            .filter_tags {
                max-height: 400px;
            }

                .search_tags {
                    padding: 12px;
                    margin-bottom: 4px;

                    font-size: 14px;
                }

                .tags_checkboxes {
                    overflow-y: scroll;

                    &::-webkit-scrollbar {
                        width: 8px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: var(--scrollbar-thumb);
                    }
                    &::-webkit-scrollbar-thumb:hover {
                        background-color: var(--scrollbar-thumb-hover);
                    }
                }

    .search {
        grid-area: search;

        margin-bottom: 8px;
    }

    .tags {
        grid-area: tags;

        display: flex;
        column-gap: 4px;

        margin-bottom: 8px;
    }

        .tag {
            display: flex;
            align-items: center;
            column-gap: 4px;

            background-color: var(--input-color);

            padding: 4px 8px;
            border-radius: 16px;
        }

            .tag_name {
                color: var(--product-tag-color);
                font-size: 14px;
            }

            .tag_icon {
                color: var(--product-tag-color);

                cursor: pointer;
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