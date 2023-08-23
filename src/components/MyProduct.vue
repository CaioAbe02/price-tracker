<template>
    <div class="product_card">
        <router-link :to="`/products/${product.id}`" class="product_infos">
            <div class="discount_icon" @click="goToProductPage(product.id)">
                <font-awesome
                    icon="fa-solid fa-percent"
                    size=lg
                    border
                    style="--fa-border-radius: 100%; --fa-border-width: 3px;"
                    :style="{ '--fa-border-color': getColor(), color: getColor() }"
                />
            </div>
            <span class="product_name">{{ product.name }}</span>
            <div class="product_price_info">
                <span class="product_current_price" :style="{ color: getColor() }">R${{ Number(product.new_prices.slice(-1)[0]).toFixed(2) }}</span>
                <span class="product_discount" :style="{ color: getColor() }">{{ getDiscount() }}</span>
            </div>
            <ProductTags :tags="product.tags" class="product_tags"/>
        </router-link>
        <div class="actions_buttons">
            <font-awesome
                icon="fa-solid fa-star"
                size="lg"
                :style="{ color: getStarColor(product.id) }"
                class="product_favorite"
                @click="addOrRemoveProduct(product.id)"
            />
            <font-awesome
                icon="fa-solid fa-pen"
                size=lg
                class="product_edit"
            />
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue'
import IProduct from '@/interfaces/IProduct'
import ProductTags from './ShowProduct/ProductTags.vue'

export default defineComponent({
    name: 'MyProduct',
    components: {
        ProductTags,
    },
    props: {
        product: {
            required: true,
            type: Object as ()=>IProduct,
        },
    },
    data() {
        return {
            myProductsIds: [] as number[]
        }
    },
    methods: {
        getDiscount(): string {
            const new_price = this.product.new_prices.slice(-1)[0]
            const original_price = this.product.original_price
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
        getColor(): string {
            const difference = this.product.new_prices.slice(-1)[0] - this.product.original_price

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
        goToProductPage(product_id: number) {
            this.$router.push(`/products/${product_id}`)
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
        getStarColor(product_id: number): string {
            if (this.myProductsIds.includes(product_id)) {
                return "yellow"
            }
            return "white"
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
.product_card {
    display: flex;
    justify-content: space-between;

    background-color: var(--card-background);
    border-radius: 10px;

    padding: 10px;
    margin: 10px 0px;
}

.product_infos {
    display: grid;
    grid-template-areas:
        'icon name'
        'icon price'
        'icon tags';
    justify-content: left;
    align-items: center;

    text-decoration: none;
}

.discount_icon {
    grid-area: icon;
    align-self: center;

    padding-right: 15px;
}

.product_name {
    grid-area: name;

    color: white;
    font-weight: bold;
}

.product_price_info {
    grid-area: price;

    display: flex;
    column-gap: 50px;

    padding: 5px 0px;
}

.product_tags {
    grid-area: tags;

    color: #B3B6B7;
}

.actions_buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 10px;
}

.product_favorite {
    color: yellow;
    cursor: pointer;
}

.product_favorite:hover {
    color: white;
}

.product_edit {
    color: white;
}

.product_infos > span {
    background-color: #2A3142;
}
</style>