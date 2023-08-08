<template>
    <div v-if="data">
        <HeaderTabs />
        <div class="myproducts_background">
            <div class="products">
                <MyProduct v-for="product in data['products']" :key="product" :product="product"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import HeaderTabs from './components/HeaderTabs.vue'
import MyProduct from './components/MyProduct.vue'

export default {
    name: 'App',
    components: {
        HeaderTabs,
        MyProduct
    },
    data() {
        return {
            data: null,
            products: null,
        }
    },
    mounted() {
        axios
        .get('https://preco-bom-ddcc1-default-rtdb.firebaseio.com/.json', {
            responseType: 'json'
        })
        .then((response: any) => (this.data = response.data))
    }
}
</script>

<style>
* {
    margin: 0;
    background-color: rgb(3, 0, 28);
    font-size: 18px;
}

.myproducts_background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.products {
    width: 500px;

    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>