<template>
    <input type="search" :placeholder="placeholder" v-model="search_input">
</template>

<script setup lang="ts">
defineProps({
    placeholder: {
        type: String,
        required: true
    }
})

const search_input = defineModel('search_input')
</script>

<style scoped>
input {
    width: 100%;

    font-size: 16px;
    color: var(--product-tag-color);

    background-color: var(--input-color);

    padding: 16px;
    border: 1px solid var(--input-color);
    border-radius: 8px;
    outline: none;

    &:focus {
        border: 1px solid var(--white);

        transition: border 0.2s ease;
    }

    &::placeholder {
        transition: color 0.2s ease;
    }

    &:hover::placeholder {
        color: var(--white);
    }

    &:focus::placeholder {
        color: var(--white);
    }
}
</style>