<template>
    <div class="tagsContainer">
        <span v-for="tag in tags" :key="tag.id" class="tag" @click="sendSearchQuery(tag.id)">{{ tag.name }}</span>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, PropType, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
    name: 'ProductTags',
    props: {
        tags_ids: {
            required: true,
            type: Array as PropType<number[]>
        },
    },
    setup(props) {
        const store = useStore()

        return {
            tags: computed(() => store.state.tags.filter((tag) => props.tags_ids.includes(tag.id))),
            store
        }
    },
    methods: {
        sendSearchQuery(tag: number) {
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