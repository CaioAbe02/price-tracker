<template>
    <div v-for="data in updated_products" :key="data.product.id">
        <span :style="{color: data.color}">{{ getProductText(data) }}</span>
    </div>
    <button @click="updateProducts()">Update</button>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { GET_PRODUCTS, UPDATE_PRODUCT_PRICE } from '@/store/action-types';
import { useStore } from '@/store';
import IProduct from '@/interfaces/IProduct';

interface Data {
    product: IProduct,
    color: string
}

export default defineComponent({
    name: 'UpdateProducts',
    data() {
        return {
            updated_products: [] as Data[]
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
                    const response = await this.store.dispatch(UPDATE_PRODUCT_PRICE, product)
                    let status = ""

                    if (response.message == "Product price not found") {
                        console.log(`%c Price for ${product.name} not found`, 'color: red')
                        status = "red"
                    }
                    else if (response.message == "Product price updated successfully") {
                        console.log(`%c New price to ${product.name}: R$${Number(response.product.new_price).toFixed(2)}`, 'color: green')
                        status = "green"
                    }
                    else {
                        console.log(`%c ${product.name} did not change the price`, 'color: yellow')
                        status = "yellow"
                    }

                    const data: {product: IProduct, color: string} = {
                        product: product,
                        color: status
                    }
                    this.updated_products.push(data)

                } catch (error) {
                    console.error('Erro ao adicionar produto:', error);
                }
            }
        },
        getProductText(data: Data) {
            if (data.color == "red") {
                return (`Price for ${data.product.name} not found`)
            }
            else if (data.color == "yellow") {
                return (`${data.product.name} did not change the price`)
            }
            else if (data.color == "green") {
                return (`New price to ${data.product.name}: R$${data.product.new_prices.slice(-1)[0].toFixed(2)}`)
            }
        }
    }
})
</script>

<style scoped>
button,
span {
    color: white;
}
</style>