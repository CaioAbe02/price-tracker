<template>
    <div class="table_card">
        <table>
            <thead>
                <tr>
                    <th @click="sortById()" class="clickable_col">
                        <div class="th_name">
                            <span>Id</span>
                            <font-awesome
                                icon="fa-solid fa-caret-up"
                                size=sm
                                class="caret_icon"
                                v-if="byId && !orderDesc"
                            />
                            <font-awesome
                                icon="fa-solid fa-caret-down"
                                size=sm
                                class="caret_icon"
                                v-if="byId && orderDesc"
                            />
                            <font-awesome
                                icon="fa-solid fa-minus"
                                size=sm
                                class="minus_icon"
                                v-if="!byId"
                            />
                        </div>
                    </th>
                    <th @click="sortByName()" class="clickable_col">
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
                    <th class="original_price_row clickable_col"  @click="sortByOriginalPrice()">
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
                    <th class="current_price_row clickable_col" @click="sortByCurrentPrice()">
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
                    <th class="discount_row clickable_col" @click="sortByDiscount()">
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
                    <th class="actions_col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in sortedProducts(byName, byOriginalPrice, byCurrentPrice, byDiscount)" :key="product.id" class="product_row">
                    <td>
                        {{ product.id }}
                    </td>
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
                        <ProductTags :tags="product.tags" @searchTag="sendSearchTag"/>
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
import ITag from '@/interfaces/ITag';
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
            byId: false,
            byName: true,
            byOriginalPrice: false,
            byCurrentPrice: false,
            byDiscount: false,
            orderDesc: true,
        }
    },
    methods: {
        sortedProducts(byName: boolean, byOriginalPrice: boolean, byCurrentPrice: boolean, byDiscount: boolean): IProduct[] {
            const products = [...this.products]
            return products.sort((product1, product2) => {
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

            if (!product.available) {
                return 'gray'
            }
            else if (difference > 0) {
                return 'var(--red)'
            }
            else if (new_price == lowest_price && difference != 0) {
                return 'var(--yellow)'
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
        sortById() {
            this.orderDesc = !this.orderDesc
            this.byId = true
            this.byName = false
            this.byOriginalPrice = false
            this.byCurrentPrice = false
            this.byDiscount = false
        },
        sortByName() {
            this.orderDesc = !this.orderDesc
            this.byId = false
            this.byName = true
            this.byOriginalPrice = false
            this.byCurrentPrice = false
            this.byDiscount = false
        },
        sortByOriginalPrice() {
            this.orderDesc = !this.orderDesc
            this.byId = false
            this.byName = false
            this.byOriginalPrice = true
            this.byCurrentPrice = false
            this.byDiscount = false
        },
        sortByCurrentPrice() {
            this.orderDesc = !this.orderDesc
            this.byId = false
            this.byName = false
            this.byOriginalPrice = false
            this.byCurrentPrice = true
            this.byDiscount = false
        },
        sortByDiscount() {
            this.orderDesc = !this.orderDesc
            this.byId = false
            this.byName = false
            this.byOriginalPrice = false
            this.byCurrentPrice = false
            this.byDiscount = true
        },
        sendSearchTag(product_tag: ITag) {
            this.$emit('searchTagQuery', product_tag)
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
    display: flex;
    justify-content: center;

    background-color: var(--card-background);
    border-radius: 10px;
    padding: 0 20px;
}

table {
    border-collapse: collapse;
    table-layout: auto;
    width: 100%;
}

th, td {
    color: white;
    text-align: left;

    padding: 10px 10px;
}

tbody, td, tfoot, th, thead, tr {
    border-color: #343b51;
    border-bottom-style: solid;
    border-bottom-width: 1px;
}

.clickable_col:hover {
    cursor: pointer;
    background-color: #32394E;
}

.product_row:hover {
    background-color: #32394E;
}

.th_name {
    display: flex;
    align-items: center;
    column-gap: 5px;
}

.product_name {
    cursor: pointer;
}

.actions {
    display: flex;
    justify-content: flex-start;
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