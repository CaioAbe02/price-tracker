<template>
<div class="search">
        <font-awesome
            icon="fa-solid fa-magnifying-glass"
            size=lg
            class="search_icon"
        />
        <input type="text" v-model="searchQuery" placeholder="Search product" aria-label="search" @input="sendSearchQuery">
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SearchInput',
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        sendSearchQuery() {
            this.$emit('inputSearchQuery', this.searchQuery)
        }
    }
})
</script>

<style scoped>
.search {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 320px;

    margin: 0 auto;
    margin-bottom: 10px;
}

.search_icon {
    color: var(--placeholder);

    position: relative;
    left: 33px;
}

input {
    display: flex;
    flex-direction: column;

    width: 100%;
    box-sizing: border-box;
    background-color: var(--background-color);
    border: 1px solid var(--input-border);
    border-radius: 5px;
    outline: 0;

    padding: 10px 15px 10px 40px;
    margin-top: 2.5px;

    color: white;
}

input:focus {
    border: 1px solid var(--purple);
}

input:focus ~ .search_icon {
    color: var(--purple);
}

::placeholder {
    color: var(--placeholder);
}
</style>