<template>
    <button type="submit" :class="setButtonColor()">
        <font-awesome
            :icon="setIcon()"
            size=sm
            class="action_icon product_edit"
            :spin="button_text == submit_status.SUBMITTING"
            v-if="button_text != submit_status.NONE"
        />
        <span v-if="button_text == submit_status.NONE">{{ button_text }}</span>
    </button>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, PropType } from 'vue';
import submit_status from '@/enums/SubmitStatus';


export default defineComponent({
    name: 'SubmitButton',
    props: {
        button_text: {
            type: String as PropType<submit_status>,
            required: true
        }
    },
    data() {
        return {
            submit_status,
        }
    },
    methods: {
        setButtonColor() {
            if (this.button_text == submit_status.NONE) {
                return 'none'
            }
            if (this.button_text == submit_status.SUBMITTING) {
                return 'submitting'
            }
            if (this.button_text == submit_status.SUCCESS) {
                return 'success'
            }
        },
        setIcon() {
            if (this.button_text == submit_status.SUBMITTING) {
                return "fa-solid fa-rotate"
            }
            if (this.button_text == submit_status.SUCCESS) {
                return "fa-regular fa-circle-check"
            }
        },
    }
})
</script>

<style scoped>
button {
    background-color: var(--purple);

    width: 100px;

    padding: 7px 15px;
    border-width: 0px;
    border-radius: 5px;

    cursor: pointer;
    user-select: none;

    transition: background-color .2s ease-in-out;
}

.none {
    background-color: var(--purple);

    &:hover {
        background-color: var(--purple-dark);
    }
}

.submitting {
    background: var(--purple);
}
.success {
    background-color: var(--green);
}
</style>