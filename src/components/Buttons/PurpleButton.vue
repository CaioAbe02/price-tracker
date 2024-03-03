<template>
    <button>
        {{ button_text }}
    </button>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PurpleButton',
    props: {
        button_text: {
            type: String,
            required: true
        }
    }
})
</script>

<style scoped>
button {
    background-color: var(--purple);

    padding: 7px 15px;
    border-width: 0px;
    border-radius: 5px;

    cursor: pointer;
    user-select: none;
}
</style>