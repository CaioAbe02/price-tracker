<template>
    <div>
        <form @submit.prevent="addProduct">
            <div>
                <label for="newProduct.name">
                    Name
                    <input type="text" v-model="newProduct.name">
                </label>
                <label for="newProduct.url">
                    Url
                    <input type="text" v-model="newProduct.url">
                </label>
                <label for="newProduct.tags">
                    Tags
                    <input type="text" v-model="newProduct.tags">
                </label>
            </div>
            <div>
                <button type="submit">
                    Add product
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { ADD_PRODUCT, GET_PRODUCTS } from '@/store/action-types';
import { useStore } from '@/store';

export default defineComponent ({
    name: 'AddProduct',
    data() {
        return {
            newProduct: {
                id: 0,
                name: '',
                url: '',
                tags: ''
            }
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
        addProduct() {
            this.newProduct.id = this.products.length
            this.store.dispatch(ADD_PRODUCT, this.newProduct)
        }
    }
})
</script>

<style scoped>
h1, label, input, button {
    color:white;
}

input {
    background-color: var(--background-color);
}
</style>