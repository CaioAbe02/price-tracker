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
    flex-wrap: wrap;
    row-gap: 10px;
}

.tag {
    color: white;
    font-size: 0.8rem;

    background-color: var(--tag_background);
    border-radius: 5px;

    padding: 3px 5px;
    margin-right: 7px;
}

@media (max-width: 850px) {
    .tagsContainer {
        justify-content: end;
    }

    .tag {
        margin-right: 0px;
        margin-left: 7px;
    }
}
</style>