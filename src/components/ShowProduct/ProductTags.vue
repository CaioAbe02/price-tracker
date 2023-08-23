<template>
    <div class="tagsContainer">
        <span v-for="tag in tagsArray" :key="tag" class="tag">{{ tag }}</span>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProductTags',
    props: {
        tags: {
            required: true,
            type: String
        },
    },
    computed: {
        tagsArray() {
            return this.tags.split(",").map(tag => tag.trim())
        }
    }
})
</script>

<style scoped>
.tagsContainer {
    display: flex;
    flex-direction: row;
}

.tag {
    color: white;
    font-size: 0.8rem;

    background-color: #434658;
    border-radius: 5px;

    padding: 3px 5px;
    margin-right: 7px;
}
</style>