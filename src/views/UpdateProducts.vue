<template>
    <div class="container">
        <button @click="updateProducts()">{{ textButton }}</button>
        <div class="card" v-for="data in updated_products" :key="data.product.id">
            <div class="product_icon">
                <font-awesome
                    :icon= getIcon(data.color)
                    size=2xl
                    :style="{ color: getColor(data.color) }"
                    v-if="data.color != 'gray'"
                />
                <font-awesome
                    icon="fa-solid fa-spinner fa-spin"
                    size=2xl
                    spin
                    :style="{ color: getColor('gray') }"
                    v-if="data.color == 'gray'"
                />
            </div>
            <span class="product_name">{{ data.product.name }}</span>
            <span class="product_price" :style="{ color: getColor(data.color) }">{{ getProductText(data) }}</span>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { GET_PRODUCTS, UPDATE_PRODUCT_PRICE } from '@/store/action-types';
import { useStore } from '@/store';
import IProduct from '@/interfaces/IProduct';

interface UpdatedProduct {
    product: IProduct,
    color: string
}

export default defineComponent({
    name: 'UpdateProducts',
    data() {
        return {
            updated_products: [] as UpdatedProduct[],
            textButton: "Update"
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_PRODUCTS)

        return {
            products: computed(() => store.state.products),
            store
        }
    },
    methods: {
        async updateProducts() {
            for (const product of this.products) {
                try {
                    let response
                    this.textButton = "Updating"

                    let updated_product: {product: IProduct, color: string} = {
                        product: product,
                        color: 'gray'
                    }
                    this.updated_products.push(updated_product)

                    for (let i = 0; i < 10; i++) {
                        response = await this.store.dispatch(UPDATE_PRODUCT_PRICE, product)
                        console.log(response.message)

                        if (response.message != "Product price not found" || !product.name.toLowerCase().includes("amazon")) {
                            break
                        }
                    }

                    if (response.message == "Product price not found") {
                        console.log(`%c Price for ${product.name} not found`, 'color: red')
                        updated_product.color = "red"
                    }
                    else if (response.message == "Product price updated successfully") {
                        console.log(`%c New price to ${product.name}: R$${Number(response.product.new_price).toFixed(2)}`, 'color: green')
                        updated_product.color = "green"
                    }
                    else {
                        console.log(`%c ${product.name} did not change the price`, 'color: white')
                        updated_product.color = "white"
                    }

                } catch (error) {
                    console.error('Erro ao atualizar produto:', error);
                }
            }
            this.textButton = "Update"
        },
        getProductText(updated_product: UpdatedProduct) {
            if (updated_product.color == "red") {
                return 'Price not found'
            }
            else if (updated_product.color == "white" || updated_product.color == "green") {
                return `R$${updated_product.product.new_prices.slice(-1)[0].toFixed(2)}`
            }
            else if (updated_product.color == "gray") {
                return 'Updating...'
            }
            return ''
        },
        getColor(status: string): string {
            if (status == 'red') {
                return 'red'
            }
            else if (status == 'green') {
                return 'green'
            }
            else if (status == 'gray') {
                return 'gray'
            }
            return 'white'
        },
        getIcon(color: string): string {
            if (color == 'red') {
                return 'fa-regular fa-circle-xmark'
            }
            return 'fa-regular fa-circle-check'
        }
    }
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
}

.card {
    display: grid;
    grid-template-areas:
        'icon name'
        'icon price';
    align-items: center;
    justify-items: start;
    justify-content: start;
    row-gap: 5px;

    background-color: var(--card-background);
    padding: 10px;
    border-radius: 10px;

    min-width: 400px;
    max-width: 400px;
}


.product_icon {
    grid-area: icon;
    justify-self: center;

    padding-right: 10px;
}

.product_name {
    grid-area: name;

    color: white;
    font-weight: bold;
}

.product_price {
    grid-area: price;
}

button {
    align-self: center;
    background-color: var(--purple);

    padding: 7px 15px;
    border-width: 0px;
    border-radius: 5px;

    cursor: pointer;
}
</style>
