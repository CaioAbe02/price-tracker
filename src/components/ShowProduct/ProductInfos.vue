<template>
    <div class="infos">
        <div class="product_name">
            <font-awesome
                icon="fa-solid fa-star"
                size="lg"
                class="favorite_icon"
                :class=isProductFavorite()
                @click="favoriteProduct(product.id)"
            />
            <h1>{{ product.name }}</h1>
        </div>
        <div class="cards">
            <div class="card">
                <span class="card_title">Original price</span>
                <span class="original_price">R${{ original_price.toFixed(2) }}</span>
            </div>
            <div class="card">
                <span class="card_title">Current price</span>
                <div class="price_info">
                    <span :class=getPriceColor()>R${{ new_price.toFixed(2) }}</span>
                    <div class="discount_tag" :class="getTagColor()">
                        <span class="discount">{{ getDiscount(original_price, new_price) }}</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <span class="card_title">Lowest price</span>
                <div class="price_info">
                    <span class="price_yellow">R${{lowest_price.toFixed(2) }}</span>
                    <div class="discount_tag discount_tag_yellow">
                        <span class="discount">{{ getDiscount(original_price, lowest_price) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import IProduct from '../../interfaces/IProduct';

export default defineComponent({
    name: 'ProductInfos',
    props: {
        product: {
            required: true,
            type: Object as ()=>IProduct
        }
    },
    data() {
        return {
            myProductsIds: [] as number[],
            original_price: this.product.original_price,
            new_price: this.product.new_prices.slice(-1)[0],
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
        getDiscount(original_price: number, new_price: number): string {
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
        getTagColor(): string {
            const difference = this.original_price - this.new_price

            if (this.new_price == this.lowest_price && difference != 0) {
                return 'discount_tag_yellow'
            }
            else if (difference > 0) {
                return 'discount_tag_green'
            }
            else if (difference < 0) {
                return 'discount_tag_red'
            }
            return 'discount_tag_white'
        },
        getPriceColor(): string {
            const difference = this.original_price - this.new_price

            if (this.new_price == this.lowest_price && difference != 0) {
                return 'price_yellow'
            }
            else if (difference > 0) {
                return 'price_green'
            }
            else if (difference < 0) {
                return 'price_red'
            }
            return 'price_white'
        }
    }
})
</script>

<style scoped>
.infos {
    width: 1000px;
    margin: 0 auto;
}

.product_name {
    display: flex;
    column-gap: 5px;
}

.favorite_icon {
    cursor: pointer;
}

.favorite_icon:hover {
    color: var(--yellow);
}

.favorite_icon_favorite {
    color: var(--yellow);
}

.favorite_icon_not_favorite {
    color: white;
}

h1 {
    color: white;
    font-size: 1.3rem;

    padding-bottom: 10px;
}

.cards {
    display: flex;
    justify-content: space-between;

    padding-bottom: 10px;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 10px;

    background-color: var(--card-background);
    border-radius: 10px;
    padding: 10px 15px;
}

.card_title {
    font-weight: bold;
}

.price_info {
    display: flex;
    column-gap: 7px;
}

.price_green {
    color: var(--green);
}

.price_yellow {
    color: var(--yellow);
}

.price_red {
    color: var(--red);
}

.price_white {
    color: white;
}

.discount_tag {
    display: flex;
    align-items: center;

    border-radius: 5px;
    padding: 3px 4px;
}

.discount_tag_green {
    background-color: var(--green);
}

.discount_tag_yellow {
    background-color: var(--yellow);
}

.discount_tag_red {
    background-color: var(--red);
}

.discount_tag_white {
    background-color: var(--tag_background);
}

.discount {
    font-size: 0.8rem;
}

span {
    color: white;
}
</style>