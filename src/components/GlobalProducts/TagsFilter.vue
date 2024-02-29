<template>
    <div class="tags">
        <div v-for="tag in tags" class="tag" :key="tag.id">
            <span class="tag_text">{{ tag.name }}</span>
            <font-awesome
                icon="fa-solid fa-xmark"
                size=xs
                class="delete_tag_icon"
                @click="sendRemoveTag(tag)"
             />
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, PropType } from 'vue';
import IProductTag from '@/interfaces/IProductTag';

export default defineComponent({
    name: 'TagsFilter',
    props: {
        tags: {
            required: true,
            type: Array as PropType<IProductTag[]>,
        }
    },
    methods: {
        sendRemoveTag(tag: IProductTag) {
            this.$emit('removeTag', tag)
        }
    }
})
</script>

<style scoped>
.tags {
    display: flex;
    column-gap: 15px;
}

.tag {
    display: flex;
    align-items: center;

    background-color: var(--tag_background);

    padding: 5px 10px;
    border-radius: 10px;
}

.tag_text {
    color: white;
    font-size: 0.9rem;

    padding-right: 10px;
}

.delete_tag_icon {
    color: white;

    cursor: pointer;
}
</style>