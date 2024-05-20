import { defineStore } from "pinia"
import axios from "axios"
import IProduct from "../interfaces/IProduct"

const BASE_URL = import.meta.env.VITE_API_URL

export const productsStore = defineStore('products', {
    state: () => ({
        products: [] as IProduct[],
    }),
    actions: {
        async getProducts() {
            const url = `${BASE_URL}/products`
            await axios.get(url)
                .then(response => this.$state.products = response.data)
        }
    }
})