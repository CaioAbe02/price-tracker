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
                <span>R${{ original_price.toFixed(2) }}</span>
            </div>
            <div class="card">
                <span class="card_title">Current price</span>
                <div class="current_price">
                    <div v-if="product.available" class="price_info">
                        <span :class=getPriceColor()>R${{ new_price.toFixed(2) }}</span>
                        <DiscountTag :original_price="original_price" :new_prices="product.new_prices" />
                    </div>
                    <span v-else :class=getPriceColor()>Unavailable!</span>
                </div>
            </div>
            <div class="card">
                <span class="card_title">Lowest price</span>
                <div class="price_info">
                    <span class="price_yellow">R${{lowest_price.toFixed(2) }}</span>
                    <DiscountTag :original_price="original_price" :new_prices="product.new_prices" :isLowestPrice="true" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import DiscountTag from '../DiscountTag.vue';
import IProduct from '../../interfaces/IProduct';

export default defineComponent({
    name: 'ProductInfos',
    components: {
        DiscountTag,
    },
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
        getPriceColor(): string {
            const difference = this.original_price - this.new_price

            if (this.new_price == this.lowest_price && difference != 0) {
                return 'price_yellow'
            }
            else if (difference < 0 || !this.product.available) {
                return 'price_red'
            }
            else if (difference > 0) {
                return 'price_green'
            }
            return 'price_white'
        }
    }
})
</script>

<style scoped>
.infos {
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
    align-items: flex-start;
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
    align-items: center;
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

span {
    color: white;
}

@media (max-width: 560px) {
    .cards {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .card {
        flex-direction: row;
        justify-content: space-between;

        padding: 15px 10px;
    }
}
</style>