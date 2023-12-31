<template>
    <div class="table_card">
        <table>
            <thead>
                <tr>
                    <th @click="sortByName()" style="cursor: pointer;">
                        Name
                        <font-awesome
                            icon="fa-solid fa-caret-up"
                            size=sm
                            class="caret_icon"
                            v-if="byName && !orderDesc"
                        />
                        <font-awesome
                            icon="fa-solid fa-caret-down"
                            size=sm
                            class="caret_icon"
                            v-if="byName && orderDesc"
                        />
                        <font-awesome
                            icon="fa-solid fa-minus"
                            size=sm
                            class="minus_icon"
                            v-if="!byName"
                        />
                    </th>
                    <th @click="sortByOriginalPrice()" style="cursor: pointer;">
                        Original price
                        <font-awesome
                            icon="fa-solid fa-caret-up"
                            size=sm
                            class="caret_icon"
                            v-if="byOriginalPrice && !orderDesc"
                        />
                        <font-awesome
                            icon="fa-solid fa-caret-down"
                            size=sm
                            class="caret_icon"
                            v-if="byOriginalPrice && orderDesc"
                        />
                        <font-awesome
                            icon="fa-solid fa-minus"
                            size=sm
                            class="minus_icon"
                            v-if="!byOriginalPrice"
                        />
                    </th>
                    <th @click="sortByCurrentPrice()" style="cursor: pointer;">
                        Current price
                        <font-awesome
                            icon="fa-solid fa-caret-up"
                            size=sm
                            class="caret_icon"
                            v-if="byCurrentPrice && !orderDesc"
                        />
                        <font-awesome
                            icon="fa-solid fa-caret-down"
                            size=sm
                            class="caret_icon"
                            v-if="byCurrentPrice && orderDesc"
                        />
                        <font-awesome
                            icon="fa-solid fa-minus"
                            size=sm
                            class="minus_icon"
                            v-if="!byCurrentPrice"
                        />
                    </th>
                    <th @click="sortByDiscount()" style="cursor: pointer;">
                        Discount
                        <font-awesome
                            icon="fa-solid fa-caret-up"
                            size=sm
                            class="caret_icon"
                            v-if="byDiscount && !orderDesc"
                        />
                        <font-awesome
                            icon="fa-solid fa-caret-down"
                            size=sm
                            class="caret_icon"
                            v-if="byDiscount && orderDesc"
                        />
                        <font-awesome
                            icon="fa-solid fa-minus"
                            size=sm
                            class="minus_icon"
                            v-if="!byDiscount"
                        />
                    </th>
                    <th>Tags</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in sortedProducts(byName, byOriginalPrice, byCurrentPrice, byDiscount)" :key="product.id" class="product_row">
                    <td @click="goToProductPage(product.id)" class="product_name" data-label="Name">
                        {{ product.name }}
                    </td>
                    <td data-label="Original Price">
                        R${{ product.original_price.toFixed(2) }}
                    </td>
                    <td v-if="product.available" :style="{ color: getColor(product) }" data-label="Current Price" >
                        R${{ product.new_prices.slice(-1)[0].toFixed(2) }}
                    </td>
                    <td v-else :style="{ color: getColor(product) }">
                        Unavailable
                    </td>
                    <td v-if="product.available" :style="{ color: getColor(product) }" data-label="Discount">
                        {{ getDiscount(product) }}
                    </td>
                    <td v-else :style="{ color: getColor(product) }">
                        Unavailable
                    </td>
                    <td data-label="Tags">
                        <ProductTags :tags="product.tags"/>
                    </td>
                    <td data-label="Actions">
                        <div class="actions">
                            <font-awesome
                                icon="fa-solid fa-star"
                                size=lg
                                :class=getStarColor(product.id)
                                class="action_icon star_icon"
                                @click="addOrRemoveProduct(product.id)"
                            />
                            <font-awesome
                                icon="fa-solid fa-pen"
                                size=lg
                                class="action_icon edit_icon"
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

import { defineComponent, PropType } from 'vue';
import IProduct from '@/interfaces/IProduct';
import ProductTags from '../ShowProduct/ProductTags.vue';

export default defineComponent({
    name: 'GlobalProductsTable',
    components: {
        ProductTags,
    },
    props: {
        products: {
            required: true,
            type: Array as PropType<IProduct[]>,
        }
    },
    data() {
        return {
            myProductsIds: [] as number[],
            byName: true,
            byOriginalPrice: false,
            byCurrentPrice: false,
            byDiscount: false,
            orderDesc: true,
        }
    },
    methods: {
        sortedProducts(byName: boolean, byOriginalPrice: boolean, byCurrentPrice: boolean, byDiscount: boolean): IProduct[] {
            return this.products.sort((product1, product2) => {
                let name1, name2

                if (byName) {
                    name1 = product1.name.toUpperCase()
                    name2 = product2.name.toUpperCase()
                }

                else if (byOriginalPrice) {
                    name1 = product1.original_price
                    name2 = product2.original_price
                }

                else if (byCurrentPrice) {
                    name1 = product1.new_prices.slice(-1)[0]
                    name2 = product2.new_prices.slice(-1)[0]
                }

                else if (byDiscount) {
                    name1 = parseFloat(this.getDiscount(product1).slice(0, -1))
                    name2 = parseFloat((this.getDiscount(product2).slice(0, -1)))
                }

                else {
                    name1 = ""
                    name2 = ""

                }

                if (this.orderDesc) {
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
        },
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
            const new_price = product.new_prices.slice(-1)[0]
            const original_price = product.original_price
            const lowest_price = Math.min(...product.new_prices)
            const difference = new_price - original_price

            if (new_price == lowest_price && difference != 0) {
                return 'var(--yellow)'
            }
            else if (difference > 0 || !product.available) {
                return 'var(--red)'
            }
            else if (difference < 0) {
                return 'var(--green)'
            }
            return 'white'
        },
        getStarColor(product_id: number): string {
            if (this.myProductsIds.includes(product_id)) {
                return "star_icon_favorite"
            }
            return "star_icon_not_favorite"
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
            this.orderDesc = !this.orderDesc
            this.byName = true
            this.byOriginalPrice = false
            this.byCurrentPrice = false
            this.byDiscount = false
        },
        sortByOriginalPrice() {
            this.orderDesc = !this.orderDesc
            this.byName = false
            this.byOriginalPrice = true
            this.byCurrentPrice = false
            this.byDiscount = false
        },
        sortByCurrentPrice() {
            this.orderDesc = !this.orderDesc
            this.byName = false
            this.byOriginalPrice = false
            this.byCurrentPrice = true
            this.byDiscount = false
        },
        sortByDiscount() {
            this.orderDesc = !this.orderDesc
            this.byName = false
            this.byOriginalPrice = false
            this.byCurrentPrice = false
            this.byDiscount = true
        },
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
    display: flex;
    justify-content: center;

    max-width: fit-content;

    background-color: var(--card-background);
    border-radius: 10px;
    padding: 0px 20px 20px 20px;
    margin: 0 auto;
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

.actions {
    display: flex;
    justify-content: center;
    column-gap: 5px;
}

.action_icon {
    transition: all .2s ease-in-out;
}

.action_icon:hover {
    transform: scale(1.2);
}

.star_icon:hover {
    color: var(--yellow);
    cursor: pointer;
}

.star_icon_favorite {
    color: var(--yellow);
}

.star_icon_not_favorite {
    color: white;
}

.edit_icon:hover {
    color: var(--purple);
    cursor: pointer;
}
</style>