import { defineStore } from "pinia"
import axios from "axios"
import IProduct from "../interfaces/IProduct"
import ITag from "../interfaces/ITag"

const BASE_URL = import.meta.env.VITE_API_URL

export const productsStore = defineStore('products', {
    state: () => ({
        products: [] as IProduct[],
    }),
    actions: {
        async getProducts() {
            const url = `${BASE_URL}/products`
            await axios.get(url)
                .then(response => this.products = response.data)
        }
    }
})

export const tagsStore = defineStore('tags', {
    state: () => ({
        tags: [] as ITag[],
        filter_tags: [] as Boolean[]
    }),
    actions: {
        async getTags() {
            const url = `${BASE_URL}/tags`
            await axios.get(url)
                .then(response => this.tags = response.data)
            this.filter_tags = new Array(this.tags.length).fill(false)
        },
    }
})