<template>
    <div class="tabs">
        <router-link to="/" class="link">My Products</router-link>
        <router-link to="/products" class="link">Products</router-link>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

export default {
    name: 'HeaderTabs',
}
</script>

<style scoped>
.tabs {
    height: 50px;
    background-color: #5B8FB9;

    display: flex;
    justify-content: center;
    align-items: center;
}

.link {
    color: white;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0);
    padding: 10px;

}
</style>
