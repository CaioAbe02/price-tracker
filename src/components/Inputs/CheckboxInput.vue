<template>
    <div class="checkbox_container" @click="selectCheckbox()">
        <font-awesome
            :icon="getCheckboxIcon()"
            size=lg
            :class="isChecked ? 'checkbox_icon_checked' : 'checkbox_icon_square'"
        />
        <input type="checkbox" :checked="isChecked">
        <label>{{ label }}</label>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CheckboxInput',
    emits: ['update:modelValue'],
    props: {
        label: {
            type: String,
            required: true
        },
        initiate_checked: {
            type: Boolean,
            required: true
        },
        modelValue: {
            type: Boolean
        }
    },
    setup(props) {
        const isChecked = ref(props.initiate_checked)
        return {
            isChecked
        }
    },
    methods: {
        selectCheckbox() {
            this.isChecked = !this.isChecked
            this.$emit('update:modelValue', this.isChecked)
        },
        getCheckboxIcon() {
            if (this.isChecked) {
                return 'fa-solid fa-square-check'
            }

            return 'fa-solid fa-square'
        }
    }
})
</script>

<style scoped>
.checkbox_container {
    display: flex;
    align-items: center;
    column-gap: 4px;

    width: fit-content;

    cursor: pointer;
}

input {
    width: 0;
}

label {
    cursor: pointer;
}

.checkbox_icon_checked {
    color: var(--purple);
}

.checkbox_icon_square {
    color: var(--input-color);

    &:hover {
        color: var(--input-color-hover)
    }
}
</style>