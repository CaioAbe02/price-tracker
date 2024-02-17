<template>
    <div class="card">
        <h1>Register product</h1>
        <form @submit.prevent="addProduct">
            <div class="input_group">
                <label for="newProduct.name">Name</label>
                <input type="text" v-model="newProduct.name">
            </div>
            <div class="input_group">
                <label for="newProduct.url">Url</label>
                <input type="text" v-model="newProduct.url">
            </div>
            <div class="input_group">
                <label for="newProduct.tags">Tags</label>
                <input type="text" v-model="newProduct.tags">
            </div>
            <button type="submit">
                {{ textButton }}
            </button>
        </form>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { ADD_PRODUCT } from '@/store/action-types';
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
            },
            textButton: 'Submit'
        }
    },
    setup() {
        const store = useStore()

        return {
            products: computed(() => store.state.products),
            store
        }
    },
    methods: {
        async addProduct() {
            this.textButton = "Submiting"
            try {
                let response

                this.newProduct.id = this.products.length
                for (let i = 0; i < 100; i++) {
                    response = await this.store.dispatch(ADD_PRODUCT, this.newProduct)

                    if (response.message == "Product added successfully") {
                        break
                    }
                }
                this.textButton = "Submit"
                console.log(response)
                this.$router.push('/products/')

            }
            catch(error) {
                this.textButton = "Submit"
                console.error(error)
            }
        }
    }
})
</script>

<style scoped>.card {
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