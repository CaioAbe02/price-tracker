<template>
    <div class="product" v-if="product">
        <ProductInfos :product="product" />
        <ProductPricesGraph :product="product"/>
        <button @click="addOrRemoveProduct(product)" class="add_product_button">{{ buttonText }}</button>
        <button @click="updateProducts()">Update</button>
        <button @click="redirectToUrl(product.url)">Site</button>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import IProduct from '@/interfaces/IProduct';
import ProductInfos from '@/components/ShowProduct/ProductInfos.vue'
import { GET_PRODUCTS, UPDATE_PRODUCT } from '@/store/action-types';
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
        }
    },
    data() {
        return {
            myProducts: [] as number[],
            isProductFavorite: false,
        }
    },
    methods: {
        addOrRemoveProduct(product: IProduct) {
            if (this.myProducts.includes(this.product.id)) {
                this.myProducts = this.myProducts.filter(prod => prod !== product.id) // remove
            }
            else {
                this.myProducts.push(product.id) // add
            }
            this.saveProducts()
            this.$router.push("/")
        },
        saveProducts() {
            const parsed = JSON.stringify(this.myProducts)
            localStorage.setItem('myProductsIds', parsed)
        },
        async updateProducts() {
            try {
                const last_price = this.product.new_prices.slice(-1)[0]
                const response = await this.store.dispatch(UPDATE_PRODUCT, this.product)

                if (response == "Product updated successfully") {
                    window.location.reload()
                }
                // this.$router.push("/")
            } catch (error) {
                console.error('Erro ao adicionar produto:', error);
            }
        },
        redirectToUrl(url: string) {
            window.open(url, '_blank')
        }
    },
    computed: {
        buttonText() {
            if (this.myProducts.includes(this.product.id)) {
                return "Remove product"
            }
            return "Add product"
        },
        product(): IProduct {
            return this.products.find(prod => prod.id == this.id)!
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
    mounted() {
        // Local Storage
        if(localStorage.getItem('myProductsIds')) {
            try {
                this.myProducts = JSON.parse(localStorage.getItem('myProductsIds') || '')
            }
            catch(e) {
                localStorage.removeItem('myProductsIds')
            }
        }
    }
})
</script>

<style scoped>
.add_product_button, button {
    color: white;
}
</style>