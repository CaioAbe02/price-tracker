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
                class="action_icon product_favorite"
                @click="$emit('favoriteButton', product.id)"
            />
            <font-awesome
                icon="fa-solid fa-pen"
                size=lg
                class="action_icon product_edit"
                @click="goToEditPage(product.id)"
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
            const new_price = this.product.new_prices.slice(-1)[0]
            const original_price = this.product.original_price
            const lowest_price = Math.min(...this.product.new_prices)
            const difference = original_price - new_price

            if (new_price == lowest_price && difference != 0) {
                return 'var(--yellow)'
            }
            else if (difference > 0) {
                return 'var(--green)'
            }
            else if (difference < 0) {
                return 'var(--red)'
            }
            return 'white'
        },
        goToProductPage(product_id: number) {
            this.$router.push(`/products/${product_id}`)
        },
        goToEditPage(product_id: number) {
            this.$router.push(`/products/edit/${product_id}`)
        },
    },
})
</script>

<style scoped>
@media (max-width: 600px) {
    .product_card {
        width: calc(100vw - 200px);
    }

    .product_infos {
        padding-right: 20px;
    }
}

@media (max-width: 500px) {
    .product_card {
        width: 300px;
    }

    .product_infos {
        padding-right: 20px;
    }
}

@media (min-width: 600px) {
    .product_card {
        width: 500px;
    }
}

.product_card {
    display: flex;
    justify-content: space-between;

    background-color: var(--card-background);
    border-radius: 10px;

    padding: 10px;
    margin: 10px 0px;

    transition: all .2s ease-in-out;
}

.product_card:hover {
    transform: scale(1.02);
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

.action_icon {
    cursor: pointer;
    transition: all .2s ease-in-out;
}

.action_icon:hover {
    transform: scale(1.2);
}

.product_favorite {
    color: var(--yellow);
}

.product_favorite:hover {
    color: white;
}

.product_edit {
    color: white;
}

.product_edit:hover {
    color: var(--purple);
}

.product_infos > span {
    background-color: #2A3142;
}
</style>