<template>
    <section class="card" v-if="product">
        <h1>Edit product</h1>
        <form @submit.prevent="editProduct()">
            <div class="input_group">
                <label for="product.name">Name</label>
                <input type="text" v-model="product.name">
            </div>
            <div class="input_group">
                <label for="product.url">Url</label>
                <input type="url" v-model="product.url">
            </div>
            <span class="tags_title">Tags</span>
            <TagsInput :product="product" />
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
import TagsInput from '@/components/TagsInput.vue';

export default defineComponent({
    name: 'EditProduct',
    components: {
        TagsInput,
    },
    props: {
        id: {
            type: Number,
            required: true
        },
    },
    setup(props) {
        const store = useStore()

        return {
            product: computed(() => store.state.products.filter((product) => product.id == props.id)[0]),
            tags: computed(() => store.state.tags),
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
        addTag(tag_id: number) {
            this.product.tags.push(this.tags.filter(tag => tag.id == tag_id)[0])
        },
        removeTag(tag_id: number) {
            const index = this.product.tags.findIndex(tag => tag.id === tag_id)

            if (index !== -1) {
                this.product.tags.splice(index, 1)
            }
        }
    }
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

.tags_title {
    color: white;
    margin: 5px 0;
}

button {
    align-self: center;
    background-color: var(--purple);

    padding: 7px 15px;
    border-width: 0px;
    border-radius: 5px;

    margin-top: 40px;

    cursor: pointer;
    user-select: none;
}
</style>