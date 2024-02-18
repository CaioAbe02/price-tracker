<template>
    <div class="product" v-if="product">
        <ProductInfos :product="product" />
        <ProductPricesGraph :product="product"/>
        <div class="buttons">
            <button @click="updateProducts()">
                <font-awesome
                    icon="fa-solid fa-rotate"
                    size=sm
                    class="action_icon product_edit"
                    :spin="isUpdating"
                />
                {{ textUpdateButton }}
            </button>
            <button @click="redirectToUrl(product.url)">
                <font-awesome
                    icon="fa-solid fa-arrow-up-right-from-square"
                    size=sm
                    class="action_icon product_edit"
                />
                Site
            </button>
            <button @click="goToEditPage(product.id)">
                <font-awesome
                    icon="fa-solid fa-pen"
                    size=sm
                    class="action_icon product_edit"
                />
                Edit
            </button>
            <button @click="updateProducts()">
                <font-awesome
                    icon="fa-solid fa-rotate"
                    size=sm
                    class="action_icon product_edit"
                    :spin="isUpdating"
                />
                {{ textUpdateButton }}
            </button>
            <button @click="redirectToUrl(product.url)">
                <font-awesome
                    icon="fa-solid fa-arrow-up-right-from-square"
                    size=sm
                    class="action_icon product_edit"
                />
                Site
            </button>
            <button @click="goToEditPage(product.id)">
                <font-awesome
                    icon="fa-solid fa-pen"
                    size=sm
                    class="action_icon product_edit"
                />
                Edit
            </button>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import ProductInfos from '@/components/ShowProduct/ProductInfos.vue'
import { UPDATE_PRODUCT_PRICE } from '@/store/action-types';
import ProductPricesGraph from '@/components/ShowProduct/ProductPricesGraph.vue';

export default defineComponent({
    name: 'ShowProduct',
    components: {
        ProductInfos,
        ProductPricesGraph
    },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            myProducts: [] as number[],
            isProductFavorite: false,
            textUpdateButton: 'Update',
            isUpdating: false,
        }
    },
    setup(props) {
        const store = useStore()

        return {
            product: computed(() => store.state.products[props.id]),
            store
        }
    },
    methods: {
        async updateProducts() {
            this.isUpdating = true
            this.isUpdating = true
            this.textUpdateButton = 'Updating'
            try {
                let response
                for (let i = 0; i < 10; i++) {
                    response = await this.store.dispatch(UPDATE_PRODUCT_PRICE, this.product)

                    if (response.message != "Product price not found") {
                        break
                    }
                }
                console.log(response)

            } catch (error) {
                console.error('Erro ao adicionar produto:', error);
            }
            this.textUpdateButton = 'Update'
            this.isUpdating = false
            this.isUpdating = false
        },
        redirectToUrl(url: string) {
            window.open(url, '_blank')
        },
        goToEditPage(product_id: number) {
            this.$router.push(`/products/edit/${product_id}`)
        },
    },
})
</script>

<style scoped>
.product {
    max-width: 1000px;
    padding: 0 10px;
    margin: 0 auto;
}

.buttons {
    display: flex;
    justify-content: center;
    column-gap: 10px;

    padding: 10px;
}

button {
    display: flex;
    column-gap: 7px;
    align-items: center;

    display: flex;
    column-gap: 7px;
    align-items: center;

    align-self: center;
    background-color: var(--purple);
    color: var(--background-color);

    padding: 7px 15px;
    border-width: 0px;
    border-radius: 5px;

    cursor: pointer;
}
</style>