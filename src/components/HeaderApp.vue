<template>
    <header>
        <div class="home">
            <router-link to="/">
                Price Tracker
            </router-link>
        </div>
        <div class="routes">
            <router-link to="/products">
                Products
            </router-link>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HeaderApp'
})
</script>

<style scoped>
    header {
        display: grid;
        grid-template-columns: min-content auto;

        padding: 16px;
    }

    .home {
        justify-self: start;
        white-space: nowrap;
    }

    .routes {
        justify-self: center;
    }
</style>