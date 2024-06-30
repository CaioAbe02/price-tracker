<template>
    <HeaderApp />
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderApp from './components/HeaderApp.vue'
import { productsStore, tagsStore } from './store';

export default defineComponent({
    name: 'App',
    components: {
        HeaderApp,
    },
    setup() {
        const products_store = productsStore()
        const tags_store = tagsStore()

        products_store.getProducts()
        tags_store.getTags()
    }
})
</script>

<style scoped>

</style>