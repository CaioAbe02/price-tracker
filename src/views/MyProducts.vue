<template>
    <div class="favorite_products">
        <h1>Favorite products</h1>
        <draggable
            v-model="favoriteProducts"
            item-key="id"
            v-bind="dragOptions"
            @end="updateFavoriteProducts"
            class="products">
            <template #item="{element}">
                <FavoriteProductCard
                    :product="element"
                    @favoriteButton="unfavoriteProduct"
                />
            </template>
        </draggable>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import FavoriteProductCard from '@/components/FavoriteProduct/FavoriteProductCard.vue';
import IProduct from '@/interfaces/IProduct';
import draggable from 'vuedraggable';

export default defineComponent({
    name: 'MyProducts',
    components: {
        draggable,
        FavoriteProductCard,
    },
    data() {
        return {
            myProductsIds: [] as number[],
            favoriteProducts: [] as IProduct[]
        }
    },
    setup() {
        const store = useStore()

        return {
            products: computed(() => store.state.products),
            store
        }
    },
    mounted() {
        if(localStorage.getItem('myProductsIds')) {
            try {
                this.myProductsIds = JSON.parse(localStorage.getItem('myProductsIds') || '')
                this.favoriteProducts = this.setFavoriteProducts()
            }
            catch(e) {
                localStorage.removeItem('myProductsIds')
            }
        }
    },
    watch: {
        products() {
            this.favoriteProducts = this.setFavoriteProducts()
        }
    },
    methods: {
        unfavoriteProduct(product_id: number) {
            const index = this.favoriteProducts.findIndex(product => product.id === product_id)

            if (index > -1) {
                this.favoriteProducts.splice(index, 1)
            }

            this.myProductsIds = this.myProductsIds.filter(id => id !== product_id)

            this.saveProducts()
        },
        updateFavoriteProducts() {
            this.myProductsIds = this.favoriteProducts.map(product => product.id)
            this.saveProducts()
        },
        saveProducts() {
            const parsed = JSON.stringify(this.myProductsIds)
            localStorage.setItem('myProductsIds', parsed)
        },
        setFavoriteProducts() {
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
    computed: {
        dragOptions() {
            return {
                animation: 200,
                ghostClass: "ghostTag"
            }
        },
    },
})
</script>

<style scoped>
.favorite_products {
    margin: 0 5%;
}

h1 {
    font-size: 32px;
    color: white;

    margin-top: 20px;
    margin-bottom: 20px;
}

.myproducts_background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
}

@media screen and (max-width: 1400px) {
    .products {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media screen and (max-width: 1100px) {
    .products {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media screen and (max-width: 830px) {
    .products {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 570px) {
    .products {
        grid-template-columns: repeat(1, 1fr);
    }
}

.ghostTag {
    opacity: 0;
}
</style>