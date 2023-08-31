<template>
    <div class="product" v-if="Object.keys(product).length > 0">
        <ProductInfos :product="product" />
        <ProductPricesGraph :product="product"/>
        <button @click="addOrRemoveProduct(product)" class="add_product_button">{{ buttonText }}</button>
        <button @click="updateProducts()">{{ textUpdateButton }}</button>
        <button @click="redirectToUrl(product.url)">Site</button>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import axios from 'axios';
import IProduct from '@/interfaces/IProduct';
import ProductInfos from '@/components/ShowProduct/ProductInfos.vue'
import { GET_PRODUCTS, UPDATE_PRODUCT_PRICE } from '@/store/action-types';
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
            product: {} as IProduct,
            myProducts: [] as number[],
            isProductFavorite: false,
            textUpdateButton: 'Update'
        }
    },
    methods: {
        addOrRemoveProduct(product: IProduct) {
            if (this.myProducts.includes(product.id)) {
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

                if (response.message == "Product price updated successfully") {
                    try {
                            const response = await axios.get(`${process.env.VUE_APP_API_URL}/products/${this.id}`)
                            this.product = response.data
                        }
                    catch (error) {
                        console.error(error)
                    }
                }
            } catch (error) {
                console.error('Erro ao adicionar produto:', error);
            }
            this.textUpdateButton = 'Update'
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
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_PRODUCTS)

        return {
            products: computed(() => store.state.products),
            store
        }
    },
    async mounted() {
        // get product
        try {
            console.log(process.env.VUE_APP_API_URL)
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/products/${this.id}`)
            this.product = response.data
        }
        catch (error) {
            console.error(error)
        }

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