<template>
    <div class="add_tags_window" :class="position == 'relative' ? 'add_tags_window_relative' : 'add_tags_window_absolute'">
        <input type="text" v-model="searchTag" placeholder="Search tag" aria-label="search" @input="filterTags()">
        <div class="tags">
            <div v-for="tag in filteredTags" :key="tag.id" class="tag" @click="selectTag(tag)">
                <font-awesome
                    icon="fa-regular fa-square"
                    size=sm
                    class="checkbox"
                    v-if="!isChecked(tag.id)"
                />
                <font-awesome
                    icon="fa-regular fa-square-check"
                    size=sm
                    class="checkbox"
                    v-if="isChecked(tag.id)"
                />
                <input type="checkbox" :id="tag.name" :checked="isChecked(tag.id)">
                <label>{{ tag.name }}</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, PropType, computed, ref } from 'vue';
import { useStore } from '@/store';
import IProductTag from '@/interfaces/IProductTag';
import ITag from '@/interfaces/ITag';

export default defineComponent({
    name: 'TagsSearch',
    props: {
        tags_props: {
            type: Array as PropType<IProductTag[]>,
            default: []
        },
        position: {
            type: String,
            default: 'relative'
        },
    },
    data() {
        return {
            searchTag: ''
        }
    },
    setup(prop) {
        const store = useStore()

        return {
            checkedTags: ref(prop.tags_props),
            tags: computed(() => store.state.tags),
            store
        }
    },
    methods: {
        filterTags() {
            this.tags.filter(tag => this.searchTag.includes(tag.name))
        },
        isChecked(tag_id: number) {
            const index =  this.checkedTags.findIndex(tag => tag.id === tag_id)

            if (index !== -1) {
                return true
            }

            return false
        },
        selectTag(tag: ITag) {
            const index = this.checkedTags.findIndex(checkedTag => checkedTag.id === tag.id)
            if (index == -1) {
                this.checkedTags.push({
                    id: tag.id,
                    name: tag.name
                })
                this.$emit('sendAddedTag', tag)
            }
            else {
                this.checkedTags.splice(index, 1)
                this.$emit('sendRemovedTag', tag)
            }
        }
    },
    computed: {
        filteredTags(): ITag[] {
            if (this.searchTag == '') {
                return this.tags
            }

            return this.tags.filter(tag => tag.name.includes(this.searchTag.toLowerCase()))
        }
    }
})
</script>

<style scoped>
.add_tags_window {
    background-color: var(--card-background);

    padding: 20px;
    border: 1px solid var(--input-border);
}

.add_tags_window_relative {
    position: relative;
}

.add_tags_window_absolute {
    position: absolute;

    border-radius: 5px;
}

input {
    display: flex;
    flex-direction: column;

    width: 100%;
    box-sizing: border-box;
    background-color: var(--card-background);
    border: 1px solid var(--input-border);
    border-radius: 5px;
    outline: 0;

    padding: 10px 15px;

    color: white;
}

input:focus {
    border: 1px solid var(--purple);
}

.tags {
    max-height: 200px;
    overflow-y: scroll;

    display: grid;
    grid-template-columns: 1fr 1fr;
}

.tag {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;

    padding: 10px;

    user-select: none;
}

.tag > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkbox {
    color: white;
}

label {
    color: white;
}
</style>