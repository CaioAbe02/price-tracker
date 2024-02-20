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
                <span
                    class="product_current_price"
                    :style="{ color: getColor() }"
                    v-if="product.available"
                >
                    R${{ new_price.toFixed(2) }}
                </span>
                <span
                    class="product_discount"
                    :style="{ color: getColor() }"
                    v-if="product.available"
                >
                    {{ getDiscount() }}
                </span>
                <span
                    class="product_unavailable"
                    v-if="!product.available"
                >
                    Unavailable
                </span>
            </div>
            <ProductTags :tags_ids="product.tags" class="product_tags"/>
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
    data() {
        return {
            new_price: this.product.new_prices.slice(-1)[0],
            original_price: this.product.original_price,
            lowest_price: Math.min(...this.product.new_prices)
        }
    },
    methods: {
        getDiscount(): string {
            const discount = (100 - (this.original_price / this.new_price) * 100).toFixed(2)

            if (this.new_price > this.original_price) {
                return (`+${discount}%`)
            }
            else if (this.new_price <this. original_price) {
                return (`${discount}%`)
            }
            else {
                return "0%"
            }
        },
        getColor(): string {
            const difference = this.original_price - this.new_price

            if (!this.product.available) {
                return 'gray'
            }
            else if (this.new_price == this.lowest_price && difference != 0) {
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

    transition: all 0.1s;

    &:hover {
        transform: scale(1.02);
    }

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

.product_unavailable {
    color: gray;
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

    &:hover {
        transform: scale(1.2);
    }
}

.product_favorite {
    color: var(--yellow);

    &:hover {
        color: white;
    }
}

.product_edit {
    color: white;

    &:hover {
        color: var(--purple);
    }
}

.product_infos > span {
    background-color: #2A3142;
}
</style>