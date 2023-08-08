<template>
    <div class="tabs">
        <button class="tab">My products</button>
        <button class="tab">Products</button>
    </div>
</template>

<script>
export default {
    name: 'HeaderTabs'
}
</script>

<style scoped>
.tabs {
    height: 50px;
    background-color: blue;

    display: flex;
    justify-content: center;
}
</style>