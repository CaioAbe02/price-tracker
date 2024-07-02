<template>
    <div class="card">
        <div class="product_icon_container" :class="product_color">
            <font-awesome
                :icon="product_icon"
                size=lg
                class="product_icon"
            />
        </div>
        <router-link :to="`/products/${product.id}`" class="product_name">{{ product.name }}</router-link>
        <span class="product_current_price" :class="product_color">{{ current_price }}</span>
        <DiscountTag :discount="discount" :tag_color="product_color" class="product_discount" v-if="product.available" />
        <ul class="product_tags">
            <li v-for="tag in product.tags" :key="tag.id" class="product_tag" @click="emitTag(tag)">{{ tag.name }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IProduct from '../../interfaces/IProduct';
import { getCurrentPrice, getDiscount, getColor, getIcon } from '../../utils';
import DiscountTag from '../DiscountTag.vue';
import IProductTag from '../../interfaces/IProductTag';

export default defineComponent({
    name: 'ProductCard',
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
            current_price: '',
            discount: '',
            product_color: '',
            product_icon: 'fa-solid fa-minus',
        }
    },
    mounted() {
        this.current_price = getCurrentPrice(this.product.new_prices, this.product.available)
        this.discount = getDiscount(this.product)
        this.product_color = getColor(this.product)
        this.product_icon = getIcon(this.product_color)
    },
    methods: {
        emitTag(tag: IProductTag) {
            this.$emit('emit_tag', tag, -1)
        }
    }
})
</script>

<style scoped>
    .card {
        display: grid;
        grid-template-areas:
            'icon name name'
            'icon price discount'
            'tags tags tags';
        grid-template-columns: var(--product-icon-size) 90px auto;
        justify-content: start;
        align-items: center;
        column-gap: 16px;
        row-gap: 5px;

        padding: 16px;
        border-radius: 10px;

        background-color: var(--card-background);
    }

    .product_icon_container {
        grid-area: icon;
        justify-self: center;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 6px;

        width: var(--product-icon-size);
        height: var(--product-icon-size);
    }

    .product_icon {
        color: var(--card-background);
    }

    .product_name {
        grid-area: name;

        font-weight: bold;
    }

    .product_current_price {
        grid-area: price;

        background-color: var(--card-background);

        font-size: 18px;
    }

    .product_discount {
        grid-area: discount;
    }

    .product_discount {
        grid-area: discount;
    }

    .product_tags {
        grid-area: tags;

        display: flex;
        align-items: center;
    }

        .product_tag {
            font-size: 14px;
            color: var(--product-tag-color);

            cursor: pointer;
        }

        .product_tag:not(:last-child)::after {
            content: "|";

            color: #636363;

            margin: 0 8px;
        }
</style>