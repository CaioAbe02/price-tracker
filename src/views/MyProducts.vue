<template>
    <div class="myproducts_background" v-if="products">
        <div class="products">
            <div class="product" v-for="product in myProducts" :key="product.id">
                <div class="move_buttons">
                    <font-awesome
                        icon="fa-solid fa-caret-up"
                        size="lg"
                        class="product_up"
                        @click="moveProductUp(product.id)"
                        v-if="product.id != myProductsIds[0]"
                    />
                    <font-awesome
                        icon="fa-solid fa-caret-down"
                        size="lg"
                        class="product_down"
                        @click="moveProductDown(product.id)"
                        v-if="product.id != myProductsIds.slice(-1)[0]"
                    />
                </div>
                <MyProduct
                    :product="product"
                    @favoriteButton="favoriteProduct"
                    @moveUp="moveProductUp"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import MyProduct from '@/components/MyProduct.vue';
import { useStore } from '@/store';
import { GET_PRODUCTS } from '@/store/action-types';
import IProduct from '@/interfaces/IProduct';

export default defineComponent({
    name: 'MyProducts',
    components: {
        MyProduct,
    },
    data() {
        return {
            myProductsIds: [] as number[],
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
    mounted() {
        if(localStorage.getItem('myProductsIds')) {
            try {
                this.myProductsIds = JSON.parse(localStorage.getItem('myProductsIds') || '')
            }
            catch(e) {
                localStorage.removeItem('myProductsIds')
            }
        }
    },
    methods: {
        favoriteProduct(product_id: number) {
            const index = this.myProductsIds.indexOf(product_id)
            if (index != -1) {
                this.removeProduct(product_id)
            }
            else {
                this.addProduct(product_id)
            }
            this.saveProducts()
        },
        addProduct(product_id: number) {
            this.myProductsIds.push(product_id)
        },
        removeProduct(product_id: number) {
            this.myProductsIds = this.myProductsIds.filter(id => id !== product_id)
        },
        moveProductUp(product_id: number) {
            const index = this.myProductsIds.indexOf(product_id)
            this.myProductsIds[index] = this.myProductsIds[index - 1]
            this.myProductsIds[index - 1] = product_id

            this.saveProducts()
        },
        moveProductDown(product_id: number) {
            const index = this.myProductsIds.indexOf(product_id)
            this.myProductsIds[index] = this.myProductsIds[index + 1]
            this.myProductsIds[index + 1] = product_id

            this.saveProducts()
        },
        saveProducts() {
            const parsed = JSON.stringify(this.myProductsIds)
            localStorage.setItem('myProductsIds', parsed)
        },
    },
    computed: {
        myProducts(): IProduct[] {
            const myProducts = [] as IProduct[]
            const BreakError = "Product found"
            if (this.products.length > 0) {
                this.myProductsIds.forEach((id: number) => {
                    try {
                        this.products.forEach((product: IProduct) => {
                            if (id == product.id) {
                                myProducts.push(product)
                                throw BreakError
                            }
                        })
                    }
                    catch(error) {
                        if (error !== BreakError) {
                            throw error
                        }
                    }
                })
            }
            return myProducts
        },
    },
})
</script>

<style scoped>
.myproducts_background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: var(--background-color);
}

.product {
    display: flex;
    align-items: center;
}

.move_buttons {
    display: flex;
    flex-direction: column;

    padding-right: 10px;
}

.product_up, .product_down {
    color: white;

    cursor: pointer;
}

.products {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>