<template>
    <div class="tags_box" :class="check_tags_box_borders()">
        <draggable
            v-model="editedProduct.tags"
            item-key="id"
            v-bind="dragOptions"
            class="dragabble_tags_area"
        >
            <template #item="{element}">
                <div class="tag">
                    {{ element.name }}
                    <font-awesome
                        icon="fa-solid fa-xmark"
                        size=xs
                        class="delete_tag_icon"
                        @click="removeTag(element)"
                    />
                </div>
            </template>
        </draggable>
        <font-awesome
            icon="fa-solid fa-chevron-down"
            size=lg
            class="tags_input_icon"
            v-if="!isTagsWindowOpen"
            @click="tagsWindow()"
        />
        <font-awesome
            icon="fa-solid fa-xmark"
            size=lg
            class="tags_input_icon"
            v-if="isTagsWindowOpen"
            @click="tagsWindow()"
        />
    </div>
    <TagsSearch
        v-if="isTagsWindowOpen"
        :tags_props="product.tags"
    />
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, computed, ref } from 'vue';
import { useStore } from '@/store';
import IProduct from '@/interfaces/IProduct';
import ITag from '@/interfaces/ITag';
import draggable from "vuedraggable";
import TagsSearch from './TagsSearch.vue';

export default defineComponent({
    name: 'TagsInput',
    components: {
        draggable,
        TagsSearch
    },
    props: {
        product: {
            type: Object as ()=>IProduct,
            required: true
        }
    },
    data() {
        return {
            isTagsWindowOpen: false,
            searchTag: ''
        }
    },
    setup(props) {
        const store = useStore()

        return {
            editedProduct: ref(props.product),
            tags: computed(() => store.state.tags),
            store
        }
    },
    methods: {
        tagsWindow() {
            this.isTagsWindowOpen = !this.isTagsWindowOpen
        },
        check_tags_box_borders() {
            if (this.isTagsWindowOpen) {
                return "tags_box_open"
            }

            return "tags_box_close"
        },
        removeTag(removed_tag: ITag) {
            const index = this.editedProduct.tags.findIndex(tag => tag.id === removed_tag.id)

            if (index !== -1) {
                this.editedProduct.tags.splice(index, 1)
            }
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                ghostClass: "ghostTag"
            }
        }
    }
})
</script>

<style scoped>
.tags_box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 10px 15px;
    border: 1px solid var(--input-border);
}

.tags_box_close {
    border-radius: 5px;
}

.tags_box_open {
    border-radius: 5px 5px 0 0;
    border-bottom: 0;
}

.dragabble_tags_area {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
}

.tag {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;

    color: white;
    font-size: 0.9rem;

    background-color: var(--tag_background);

    padding: 5px 10px;
    border-radius: 10px;

    cursor: move;
    user-select: none;
}

.ghostTag {
    opacity: 0;
}

.delete_tag_icon {
    cursor: pointer;
}

.tags_input_icon {
    color: white;
    cursor: pointer;
}
</style>