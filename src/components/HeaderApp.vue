<template>
    <header class="tabs">
        <router-link
            to="/products"
        >
            Products
        </router-link>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HeaderApp'
})
</script>

<style scoped>

</style>