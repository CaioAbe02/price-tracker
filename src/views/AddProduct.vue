<template>
    <div class="card">
        <h1>Register product</h1>
        <form @submit.prevent="addProduct">
            <div class="inputs">
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
                    Submit
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
.card {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: var(--card-background);
    max-width: 350px;
    border-radius: 10px;

    margin: 0 auto;
    padding: 30px 0px;
}

h1 {
    font-size: 1.5rem;
    color: white;

    padding-top: 10px;
    padding-bottom: 30px;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

label {
    color: var(--input-label);

    padding: 5px 0px;
}

input {
    display: flex;
    flex-direction: column;

    background-color: var(--card-background);
    border: 1px solid var(--input-border);
    border-radius: 5px;
    outline: 0;

    padding: 10px 15px;
    margin-top: 2.5px;

    color: white;
}

input:focus {
    border: 1px solid var(--purple);
}

.inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    background-color: var(--purple);

    padding: 7px 15px;
    border-width: 0px;
    border-radius: 5px;

    margin-top: 30px;
    margin-bottom: 10px;
}

</style>