<template>
    <div class="table_card">
        <table>
            <thead>
                <tr>
                    <th @click="sortByName()">Name</th>
                    <th>Original price</th>
                    <th>Current price</th>
                    <th>Discount</th>
                    <th>Tags</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in sortedProducts" :key="product.id" class="product_row">
                    <td @click="goToProductPage(product.id)" class="product_name">
                        {{ product.name }}
                    </td>
                    <td>
                        R${{ product.original_price.toFixed(2) }}
                    </td>
                    <td :style="{ color: getColor(product) }">
                        R${{ product.new_prices.slice(-1)[0].toFixed(2) }}
                    </td>
                    <td :style="{ color: getColor(product) }" >
                        {{ getDiscount(product) }}
                    </td>
                    <td>
                        <ProductTags :tags="product.tags" />
                    </td>
                    <td>
                        <div>
                            <font-awesome
                                icon="fa-solid fa-star"
                                size=lg
                                :style="{ color: getStarColor(product.id) }"
                                class="star_icon"
                                @click="addOrRemoveProduct(product.id)"
                            />
                            <font-awesome
                                icon="fa-solid fa-pen"
                                size=lg
                                class="edit_icon"
                                @click="goToEditPage(product.id)"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { GET_PRODUCTS } from '@/store/action-types';
import IProduct from '@/interfaces/IProduct';
import ProductTags from './ShowProduct/ProductTags.vue';

export default defineComponent({
    name: 'GlobalProductsTable',
    components: {
        ProductTags,
    },
    data() {
        return {
            myProductsIds: [] as number[],
            nameDesc: true,
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
    computed: {
        sortedProducts(byName: true): IProduct[] {
            if (byName) {
                return this.products.sort((product1, product2) => {
                    const name1 = product1.name.toUpperCase()
                    const name2 = product2.name.toUpperCase()

                    if (this.nameDesc) {
                        if (name1 < name2) {
                            return -1
                        }
                        if (name1 > name2) {
                            return 1
                        }
                        return 0
                    }
                    if (name1 < name2) {
                        return 1
                    }

                    if (name1> name2) {
                        return -1
                    }

                    return 0
                })
            }
            return []
        }
    },
    methods: {
        getDiscount(product: IProduct): string {
            const new_price = product.new_prices.slice(-1)[0]
            const original_price = product.original_price
            const discount = (100 - (original_price / new_price) * 100).toFixed(2)

            if (new_price > original_price) {
                return (`+${discount}%`)
            }
            else if (new_price < original_price) {
                return (`${discount}%`)
            }
            else {
                return "0%"
            }
        },
        goToProductPage(product_id: number) {
            this.$router.push(`/products/${product_id}`)
        },
        goToEditPage(product_id: number) {
            this.$router.push(`/products/edit/${product_id}`)
        },
        getColor(product: IProduct): string {
            const difference = product.new_prices.slice(-1)[0] - product.original_price

            if (difference > 0) {
                return '#D82E3F'
            }
            else if (difference < 0) {
                return '#28CC2D'
            }
            else {
                return '#FFE135'
            }
        },
        getStarColor(product_id: number): string {
            if (this.myProductsIds.includes(product_id)) {
                return "yellow"
            }
            return "white"
        },
        addOrRemoveProduct(product_id: number) {
            if (this.myProductsIds.includes(product_id)) {
                this.myProductsIds = this.myProductsIds.filter(id => id !== product_id) // remove
            }
            else {
                this.myProductsIds.push(product_id) // add
            }
            this.saveProducts()
        },
        saveProducts() {
            const parsed = JSON.stringify(this.myProductsIds)
            localStorage.setItem('myProductsIds', parsed)
        },
        sortByName() {
            this.nameDesc = !this.nameDesc
        }
    },
    mounted() {
        if(localStorage.getItem('myProductsIds')) {
            try {
                this.myProductsIds = JSON.parse(localStorage.getItem('myProductsIds') || '')
            }
            catch(e) {
                localStorage.removeItem('myProductsIds')
            }
        }
    },
})
</script>

<style scoped>
.table_card {
    background-color: var(--card-background);

    border-radius: 10px;
    padding: 20px;
}

table {
    border-collapse: collapse;
}

th, td {
    color: white;

    padding: 10px 10px;
}

tbody, td, tfoot, th, thead, tr {
    border-color: #343b51;
    border-bottom-style: solid;
    border-bottom-width: 1px;
}

.product_row:hover {
    background-color: #32394E;
}

.product_name {
    cursor: pointer;
}

.star_icon:hover {
    color: yellow !important;
    cursor: pointer;
}

</style>