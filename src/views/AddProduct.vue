<template>
    <div class="card">
        <h1>Register a product</h1>
        <form @submit.prevent="addProduct">
            <div class="input_group">
                <label for="newProduct.name">Name</label>
                <input type="text" v-model="newProduct.name">
            </div>
            <div class="input_group">
                <label for="newProduct.url">Url</label>
                <input type="text" v-model="newProduct.url">
            </div>
            <span class="tags_title">Tags</span>
            <TagsInput
                :product="newProduct"
                @sendAddedTag="addProductId"
                @sendRemovedTag="removeProductId"
                @sendNewTag="pushNewTag"
            />
            <SubmitButton :button_text="button_status" class="submit_button" />
        </form>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { ADD_PRODUCT, ADD_TAG, EDIT_TAG } from '@/store/action-types';
import { useStore } from '@/store';
import IProduct from '@/interfaces/IProduct';
import TagsInput from '@/components/TagsInput.vue';
import SubmitButton from '@/components/Buttons/SubmitButton.vue';
import ITag from '@/interfaces/ITag';
import submit_status from '@/enums/SubmitStatus';

export default defineComponent ({
    name: 'AddProduct',
    components: {
        TagsInput,
        SubmitButton
    },
    data() {
        const newProduct: IProduct = {
            id: this.products.length,
            name: '',
            new_prices: [],
            new_prices_dates: [],
            original_price: 0,
            tags: [],
            url: '',
            available: true
        }
        return {
            newProduct,
            button_status: submit_status.NONE,
            edited_tags: [] as ITag[],
            new_tags: [] as ITag[]
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
            this.button_status = submit_status.SUBMITTING
            try {
                let response

                for (let i = 0; i < 100; i++) {
                    response = await this.store.dispatch(ADD_PRODUCT, this.newProduct)

                    if (response.message == "Product added successfully") {
                        break
                    }
                }
                for (let tag of this.edited_tags) {
                    await this.store.dispatch(EDIT_TAG, tag)
                }
                for (let tag of this.new_tags) {
                    await this.store.dispatch(ADD_TAG, tag)
                }
                this.button_status = submit_status.SUCCESS
                this.redirectToProductPage(response.product.id)

            }
            catch(error) {
                this.button_status = submit_status.NONE
                console.error(error)
            }
        },
        async redirectToProductPage(id: number) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.resetForms()
            this.$router.push(`/products/${id}`)
        },
        resetForms() {
            this.button_status = submit_status.NONE
            this.newProduct.id = this.products.length
            this.newProduct.name = ''
            this.newProduct.url = ''
            this.newProduct.tags = []
        },
        addProductId(tag: ITag) {
            const index = this.edited_tags.findIndex(edited_tag => edited_tag.id === tag.id)
            if (index !== -1) {
                this.edited_tags.splice(index, 1)
            }
            this.edited_tags.push(tag)

            tag.products_ids.push(this.newProduct.id)
        },
        removeProductId(tag: ITag) {
            const index_tag = this.edited_tags.findIndex(edited_tag => edited_tag.id === tag.id)
            if (index_tag !== -1) {
                this.edited_tags.splice(index_tag, 1)
            }
            this.edited_tags.push(tag)

            const index_product_id = tag.products_ids.findIndex(product_id => product_id === this.newProduct.id)
            tag.products_ids.splice(index_product_id, 1)
        },
        pushNewTag(tag: ITag) {
            tag.products_ids.push(this.newProduct.id)
            this.new_tags.push(tag)
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

.tags_title {
    color: white;
    margin: 5px 0;
}

.submit_button {
    align-self: center;

    margin-top: 40px;
}
</style>