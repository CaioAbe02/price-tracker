<template>
    <section class="card" v-if="product">
        <h1>Edit product</h1>
        <form @submit.prevent="editProduct()">
            <div class="input_group">
                <label for="editedProduct.name">Name</label>
                <input type="text" v-model="product.name">
            </div>
            <div class="input_group">
                <label for="editedProduct.tags">Tags</label>
                <input type="text" v-model="product.tags">
            </div>
            <div class="input_group">
                <label for="editedProduct.tags">Link</label>
                <input type="text" v-model="product.url">
            </div>
            <button type="submit">
                Submit
            </button>
        </form>
    </section>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { EDIT_PRODUCT } from '@/store/action-types';

export default defineComponent({
    name: 'EditProduct',
    props: {
        id: {
            type: Number,
            required: true
        },
    },
    setup(props) {
        const store = useStore()
        const product = computed(() => store.state.products[props.id])

        return {
            product,
            store
        }
    },
    methods: {
        async editProduct() {
            try {
                await this.store.dispatch(EDIT_PRODUCT, this.product)
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