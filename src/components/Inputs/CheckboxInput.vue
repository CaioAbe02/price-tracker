<template>
    <div class="checkbox_container" @click="isChecked = !isChecked">
        <font-awesome
            :icon="isChecked ? 'fa-solid fa-square-check' : 'fa-solid fa-square'"
            size=lg
            :class="isChecked ? 'checkbox_icon_checked' : 'checkbox_icon_square'"
        />
        <input type="checkbox" v-model="isChecked">
        <label>{{ label }}</label>
    </div>
</template>

<script setup lang="ts">

defineProps({
    label: {
        type: String,
        required: true
    }
})

const isChecked = defineModel('isChecked')
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