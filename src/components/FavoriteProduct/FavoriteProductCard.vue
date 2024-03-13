<template>
    <router-link :to="`/products/${product.id}`" class="product_card" v-if="product">
        <div class="product_icon" :style="{ backgroundColor: getColor() }">
            <font-awesome
                :icon=setProductIcon()
                size="xl"
            />
        </div>
        <span class="product_name">{{ product.name }}</span>
        <div class="product_price_info">
            <span
                class="product_new_price"
                :style="{ color: getColor() }"
            >
                {{ product_price }}
            </span>
            <DiscountTag
                :original_price="product.original_price"
                :new_prices="product.new_prices"
                class="product_dicount"
                v-if="product.available"
            />
        </div>
        <font-awesome
            icon="fa-solid fa-star"
            size="lg"
            class="action_icon product_favorite"
            @click.prevent="$emit('favoriteButton', product.id)"
        />
        <font-awesome
            icon="fa-solid fa-pen"
            size=lg
            class="action_icon product_edit"
            @click.prevent="goToEditPage(product.id)"
        />
    </router-link >
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import DiscountTag from '../DiscountTag.vue';
import IProduct from '@/interfaces/IProduct';

export default defineComponent({
    name: 'FavoriteProductCard',
    components: {
        DiscountTag,
    },
    props: {
        product: {
            required: true,
            type: Object as () => IProduct,
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
        setProductIcon() {
            const difference = this.original_price - this.new_price

            if (!this.product.available) {
                return 'fa-solid fa-xmark'
            }
            else if (this.new_price == this.lowest_price && difference != 0) {
                return 'fa-solid fa-arrow-trend-down'
            }
            else if (difference > 0) {
                return 'fa-solid fa-arrow-trend-down'
            }
            else if (difference < 0) {
                return 'fa-solid fa-arrow-trend-up'
            }
            return 'fa-solid fa-minus'
        },
        goToEditPage(product_id: number) {
            this.$router.push(`/products/edit/${product_id}`)
        },
    },
    computed: {
        product_price(): String {
            if (this.product.available) {
                return `R$${ this.new_price.toFixed(2) }`
            }

            return 'Unavailable'
        },
    },
})
</script>

<style scoped>
.product_card {
    flex-grow: 1;
    flex-basis: 20%;

    display: grid;
    grid-template-areas:
        'icon icon'
        'name name'
        'price price'
        'unavailable unavailable'
        'edit favorite';

    grid-template-columns: 1fr 1fr;
    grid-template-rows: 95px 1fr 1fr auto;

    height: 260px;

    background-color: var(--card-background);

    padding: 20px;
    border-radius: 10px;

    text-decoration: none;

    transition: background-color .2s ease-in-out;

    &:hover {
        background-color: var(--card-background-darker);
    }
}

.product_icon {
    grid-area: icon;
    justify-self: center;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 50px;
    width: 50px;

    border-radius: 100%;
}

.product_icon > * {
    color: var(--card-background)
}

.product_name {
    grid-area: name;
    text-align: start;
    align-self: start;

    color: white;
}

.product_price_info {
    grid-area: price;

    display: flex;
    align-items: center;
    column-gap: 10px;

    height: min-content;
}

.product_new_price {
    grid-column-start: 1;

    font-size: 24px;
    font-weight: bold;
}

.product_unavailable {
    grid-area: unavailable;
    text-align: center;
    align-self: center;

    color: gray;
}

.action_icon {
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.2);
    }
}

.product_edit {
    grid-area: edit;
    justify-self: center;
    align-self: end;

    color: white;

    &:hover {
        color: var(--purple);
    }
}

.product_favorite {
    grid-area: favorite;
    justify-self: center;
    align-self: end;

    color: var(--yellow);

    &:hover {
        color: white;
    }
}
</style>