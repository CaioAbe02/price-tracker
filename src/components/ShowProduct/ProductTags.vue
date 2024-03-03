<template>
    <div class="tagsContainer">
        <span v-for="tag in tags" :key="tag.id" class="tag" @click="sendSearchQuery(tag)">{{ tag.name }}</span>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, PropType } from 'vue';
import IProductTag from '@/interfaces/IProductTag';

export default defineComponent({
    name: 'ProductTags',
    props: {
        tags: {
            required: true,
            type: Array as PropType<IProductTag[]>
        },
    },
    methods: {
        sendSearchQuery(tag: IProductTag) {
            this.$emit('searchTag', tag)
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
    column-gap: 7px;
}

.tag {
    color: white;
    font-size: 0.8rem;

    background-color: var(--tag_background);
    border-radius: 5px;

    padding: 3px 5px;

    cursor: pointer;
}
</style>