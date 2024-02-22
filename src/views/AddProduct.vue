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
            <TagsInput :product="newProduct" />
            <button type="submit" :class="setButtonColor()">
                <font-awesome
                    :icon="setIcon()"
                    size=sm
                    class="action_icon product_edit"
                    :spin="textButton == status.SUBMITTING"
                    v-if="textButton != status.NONE"
                />
                <span v-if="textButton == status.NONE">{{ textButton }}</span>
            </button>
        </form>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { ADD_PRODUCT } from '@/store/action-types';
import { useStore } from '@/store';
import IProduct from '@/interfaces/IProduct';
import TagsInput from '@/components/TagsInput.vue';

enum status {
    NONE = 'Submit',
    SUBMITTING = 'Submitting',
    SUCCESS = 'Done',
    ERROR = 'Error'
}

export default defineComponent ({
    name: 'AddProduct',
    components: {
        TagsInput
    },
    data() {
        const newProduct: IProduct = {
            id: 0,
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
            status,
            textButton: status.NONE
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
            this.textButton = status.SUBMITTING
            try {
                let response

                this.newProduct.id = this.products.length
                for (let i = 0; i < 100; i++) {
                    response = await this.store.dispatch(ADD_PRODUCT, this.newProduct)

                    if (response.message == "Product added successfully") {
                        break
                    }
                }
                this.textButton = status.SUCCESS
                console.log(response.product)
                this.redirectToProductPage(response.product.id)

            }
            catch(error) {
                this.textButton = status.NONE
                console.error(error)
            }
        },
        async redirectToProductPage(id: number) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.resetForms()
            this.$router.push(`/products/${id}`)
        },
        resetForms() {
            this.textButton = status.NONE
            this.newProduct.id = 0
            this.newProduct.name = ''
            this.newProduct.url = ''
            this.newProduct.tags = []
        },
        setIcon() {
            if (this.textButton == status.SUBMITTING) {
                return "fa-solid fa-rotate"
            }
            if (this.textButton == status.SUCCESS) {
                return "fa-regular fa-circle-check"
            }
        },
        setButtonColor() {
            if (this.textButton == status.NONE) {
                return 'none'
            }
            if (this.textButton == status.SUBMITTING) {
                return 'submitting'
            }
            if (this.textButton == status.SUCCESS) {
                return 'success'
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

.tags_title {
    color: white;
    margin: 5px 0;
}

button {
    align-self: center;

    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 7px;

    height: 40px;
    width: 100px;

    padding: 7px 15px;
    border-width: 0px;
    border-radius: 5px;

    margin-top: 40px;

    cursor: pointer;
}

.none {
    background-color: var(--purple);
}

.submitting {
    background: var(--purple);
}
.success {
    background-color: var(--green);
}

</style>