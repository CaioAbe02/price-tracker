<template>
    <HeaderApp />
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderApp from './components/HeaderApp.vue'
import { productsStore } from './store';

export default defineComponent({
    name: 'App',
    components: {
        HeaderApp,
    },
    setup() {
        const store = productsStore()

        store.getProducts()
    }
})
</script>

<style scoped>

</style>