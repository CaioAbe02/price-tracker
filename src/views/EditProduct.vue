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
            <TagsInput
                :product="product"
                @sendAddedTag="addProductId"
                @sendRemovedTag="removeProductId"
                @sendNewTag="pushNewTag"
            />
            <PurpleButton button_text="Submit" class="submit_button" type="submit"/>
        </form>
    </section>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { ADD_TAG, EDIT_PRODUCT, EDIT_TAG } from '@/store/action-types';
import TagsInput from '@/components/TagsInput.vue';
import PurpleButton from '@/components/Buttons/PurpleButton.vue';
import ITag from '@/interfaces/ITag';

export default defineComponent({
    name: 'EditProduct',
    components: {
        TagsInput,
        PurpleButton
    },
    props: {
        id: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            edited_tags: [] as ITag[],
            new_tags: [] as ITag[]
        }
    },
    setup(props) {
        const store = useStore()

        return {
            product: computed(() => store.state.products.filter((product) => product.id == Number(props.id))[0]),
            tags: computed(() => store.state.tags),
            store
        }
    },
    methods: {
        async editProduct() {
            try {
                await this.store.dispatch(EDIT_PRODUCT, this.product)
                for (let tag of this.edited_tags) {
                    await this.store.dispatch(EDIT_TAG, tag)
                }
                for (let tag of this.new_tags) {
                    await this.store.dispatch(ADD_TAG, tag)
                }
                this.$router.go(-1)
            }
            catch (error) {
                console.error(error)
            }
        },
        addProductId(tag: ITag) {
            const index = this.edited_tags.findIndex(edited_tag => edited_tag.id === tag.id)
            if (index !== -1) {
                this.edited_tags.splice(index, 1)
            }
            this.edited_tags.push(tag)

            tag.products_ids.push(this.product.id)
        },
        removeProductId(tag: ITag) {
            const index_tag = this.edited_tags.findIndex(edited_tag => edited_tag.id === tag.id)
            if (index_tag !== -1) {
                this.edited_tags.splice(index_tag, 1)
            }
            this.edited_tags.push(tag)

            const index_product_id = tag.products_ids.findIndex(product_id => product_id === this.product.id)
            tag.products_ids.splice(index_product_id, 1)
        },
        pushNewTag(tag: ITag) {
            tag.products_ids.push(this.product.id)
            this.new_tags.push(tag)
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

.submit_button {
    align-self: center;

    margin-top: 40px;
}
</style>