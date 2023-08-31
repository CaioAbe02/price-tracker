<template>
    <section>
        <form @submit.prevent="editProduct()">
            <div>
                <input type="text" v-model="editedProduct.name">
                <label for="editedProduct.tags">
                    Tags
                    <input type="text" v-model="editedProduct.tags">
                </label>
            </div>
            <div>
                <button type="submit">
                    Edit product
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { EDIT_PRODUCT } from '@/store/action-types';
import IProduct from '@/interfaces/IProduct';
import axios from 'axios';

export default defineComponent({
    name: 'EditProduct',
    props: {
        id: {
            type: Number,
        },
    },
    data() {
        return {
            product: {} as IProduct,
            editedProduct: {
                id: 0,
                name: "",
                tags: ""
            }
        }
    },
    setup() {
        const store = useStore()

        return {
            store
        }
    },
    async mounted() {
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/products/${this.id}`)
            this.product = response.data

            this.editedProduct.id = this.product.id
            this.editedProduct.name = this.product.name
            this.editedProduct.tags = this.product.tags
        }
        catch (error) {
            console.error(error)
        }

    },
    methods: {
        editProduct() {
            this.store.dispatch(EDIT_PRODUCT, this.editedProduct)
        },
    },
})
</script>

<style scoped></style>