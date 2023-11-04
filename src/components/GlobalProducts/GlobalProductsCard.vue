<template>
    <div class="card" @click="goToProductPage()">
        <div class="product_name">
            <div class="icon_favorite">
                <font-awesome
                    icon="fa-solid fa-star"
                    size="lg"
                    class="favorite_icon"
                    :class=isProductFavorite()
                    @click="favoriteProduct(product.id)"
                />
            </div>
            <span>{{ product.name }}</span>
        </div>
        <div class="row">
            <span class="row_title">Original price:</span>
            <span>R${{ original_price.toFixed(2) }}</span>
        </div>
        <div class="row">
            <span class="row_title">Current price:</span>
            <div class="current_price">
                <span :class="getTextColor()">R${{ current_price.toFixed(2) }}</span>
            </div>
        </div>
        <div class="row">
            <span class="row_title">Discount:</span>
            <div class="current_price">
                <span :class="getTextColor()">{{ getDiscount() }}</span>
            </div>
        </div>
        <div class="row">
            <span class="row_title">Tags:</span>
            <div class="current_price">
                <ProductTags :tags="product.tags" class="tags"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import ProductTags from '../ShowProduct/ProductTags.vue'
import IProduct from '@/interfaces/IProduct';

export default defineComponent({
    name: 'GlobalProductCard',
    components: {
        ProductTags,
    },
    props: {
        product: {
            required: true,
            type: Object as ()=> IProduct
        }
    },
    data() {
        return {
            myProductsIds: [] as number[],
            original_price: this.product.original_price,
            current_price: this.product.new_prices.slice(-1)[0],
            lowest_price: Math.min(...this.product.new_prices),
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
    methods: {
        isProductFavorite(): string {
            if (this.myProductsIds.includes(this.product.id)) {
                return 'favorite_icon_favorite'
            }
            return 'favorite_icon_not_favorite'
        },
        favoriteProduct(product_id: number) {
            const index = this.myProductsIds.indexOf(product_id)
            if (index != -1) {
                this.removeProduct(product_id)
            }
            else {
                this.addProduct(product_id)
            }
            this.saveProducts()
        },
        addProduct(product_id: number) {
            this.myProductsIds.push(product_id)
        },
        removeProduct(product_id: number) {
            this.myProductsIds = this.myProductsIds.filter(id => id !== product_id)
        },
        saveProducts() {
            const parsed = JSON.stringify(this.myProductsIds)
            localStorage.setItem('myProductsIds', parsed)
        },
        getDiscount(): string {
            const discount = (100 - (this.original_price / this.current_price) * 100).toFixed(2)

            if (this.current_price >this.original_price) {
                return (`+${discount}%`)
            }
            if (this.current_price < this.original_price) {
                return (`${discount}%`)
            }
            return "0%"
        },
        getTextColor(): string {
            const difference = this.original_price - this.current_price

            if (this.lowest_price == this.current_price && difference != 0) {
                return 'text_yellow'
            }
            else if (difference > 0) {
                return 'text_green'
            }
            else if (difference < 0) {
                return 'text_red'
            }
            return 'text_white'
        },
        goToProductPage() {
            this.$router.push(`/products/${this.product.id}`)
        },
    },
})
</script>

<style scoped>
.card {
    background-color: var(--card-background);

    padding: 10px;
    margin: 10px;
    border-radius: 10px;
}

.product_name {
    display: flex;
    align-items: center;
    column-gap: 5px;

    padding-bottom: 10px;
    border-bottom: 2px solid #343b51;
}

.favorite_icon_favorite {
    color: var(--yellow);
}

.favorite_icon_not_favorite {
    color: white;
}

.product_name span {
    font-weight: bold;
}

.row {
    display: flex;
    justify-content: space-between;

    padding-top: 7px;
}

.row_title {
    min-width: 120px;
}

.current_price {
    display: flex;
    column-gap: 10px;
}

.tags {
    justify-content: end;
}

.text_red {
    color: var(--red);
}

.text_yellow {
    color: var(--yellow);
}

.text_green {
    color: var(--green);
}

.text_white {
    color: white;
}

span {
    color: white;
}
</style>