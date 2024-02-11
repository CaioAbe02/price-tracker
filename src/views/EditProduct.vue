<template>
    <section class="card">
        <h1>Edit product</h1>
        <form @submit.prevent="editProduct()">
            <div class="input_group">
                <label for="editedProduct.name">Name</label>
                <input type="text" v-model="editedProduct.name">
            </div>
            <div class="input_group">
                <label for="editedProduct.tags">Tags</label>
                <input type="text" v-model="editedProduct.tags">
            </div>
            <div class="input_group">
                <label for="editedProduct.tags">Link</label>
                <input type="text" v-model="editedProduct.url">
            </div>
            <button type="submit">
                Submit
            </button>
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
                tags: "",
                url: ""
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
            this.editedProduct.url = this.product.url
        }
        catch (error) {
            console.error(error)
        }

    },
    methods: {
        async editProduct() {
            try {
                await this.store.dispatch(EDIT_PRODUCT, this.editedProduct)
                this.$router.go(-1)
            }
            catch (error) {
                console.error(error)
            }
        },
    },
})
</script>

<style scoped>
.card {
    background-color: var(--card-background);
    max-width: 500px;
    border-radius: 10px;

    margin: 0 auto;
    padding: 40px;
}

form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
}

h1 {
    font-size: 1.5rem;
    color: white;
    text-align: center;
}

label {
    display: block;
    margin-bottom: 5px;

    color: var(--input-label);
}

.input_group {
    margin-top: 5px;
}

input {
    display: flex;
    flex-direction: column;

    width: 100%;
    box-sizing: border-box;
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

button {
    align-self: center;
    background-color: var(--purple);

    padding: 7px 15px;
    border-width: 0px;
    border-radius: 5px;

    margin-top: 40px;

    cursor: pointer;
}
</style>