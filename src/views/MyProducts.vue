<template>
    <div class="myproducts_background" v-if="products">
        <div class="products">
            <MyProduct v-for="product in myProducts" :key="product.id" :product="product"/>
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
            // return this.products.filter((product: IProduct) => this.myProductsIds.includes(product.id))
            return myProducts
        },
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

@media (max-width: 500px) {
    .products {
        max-width: 500px;
    }
}

@media (min-width: 500px) {
    .products {
        width: 500px;
    }
}

.products {
    display: flex;
    flex-direction: column;
    justify-content: center;

}
</style>