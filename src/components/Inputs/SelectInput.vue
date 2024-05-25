<template>
    <div class="custom_select" ref="custom_select_ref">
        <div
            class="selected_option"
            :class="isOptionsVisible ? 'selected_option_border' : ''"
            @click="isOptionsVisible = !isOptionsVisible"
        >
            <span>{{ selected_option.label }}</span>
            <font-awesome
                icon="fa-solid fa-angle-down"
                size=sm
                class="select_icon"
                :class="isOptionsVisible ? 'icon_rotated' : ''"
            />
        </div>
        <div class="options_container">
            <div class="options" :class="!isOptionsVisible ? 'invisible transform_animation' : ''">
                <div
                    class="option"
                    :class="!isOptionsVisible ? 'invisible' : ''"
                    v-for="option in options"
                    :key="option.value"
                    @click=selectOption(option)
                >
                    <span>{{ option.label }}</span>
                    <div class="option_icon">
                        <font-awesome
                            icon="fa-solid fa-check"
                            size=sm
                            v-if="option.value == selected_option.value"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import IOption from '../../interfaces/IOption';

export default defineComponent({
    name: 'SelectInput',
    emits: ['update:modelValue'],
    props: {
        options: {
            type: Array as () => IOption[],
            required: true
        },
        modelValue: {
            default: ''
        }
    },
    setup(props) {
        const isOptionsVisible = ref(false)
        const custom_select_ref = ref<HTMLElement | null>(null)
        const selected_option = ref<IOption>(props.options[0])

        const closeDropDown = (event: MouseEvent) => {
            if (custom_select_ref.value && !custom_select_ref.value.contains(event.target as Node)) {
                isOptionsVisible.value = false
            }
        }

        return {
            selected_option,
            isOptionsVisible,
            custom_select_ref,
            closeDropDown
        }
    },
    methods: {
        selectOption(option: IOption) {
            this.selected_option = option
            this.$emit('update:modelValue', option.value)
            this.isOptionsVisible = false
        },
    },
    mounted() {
        window.addEventListener('click', this.closeDropDown)
    },
    beforeMount() {
        window.removeEventListener('click', this.closeDropDown)
    }
})
</script>

<style scoped>
.custom_select {
    width: max-content;
    height: 40px;
}

.selected_option {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 8px;

    background-color: var(--input-color);

    padding: 8px 12px;
    border-radius: 8px;

    cursor: pointer;
    z-index: 2;

    transition: background-color 0.2s ease, border-radius 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);

    &:hover {
        background-color: var(--input-color-hover);
    }
}

    .selected_option_border {
        border-radius: 8px 8px 0 0;

        transition: all 0.2s ease;
    }

    .selected_option span {
        width: 100%;
    }

    .select_icon {
        transition: all 0.1s ease-out;
    }

    .icon_rotated {
        transform: rotate(180deg);
}

.options_container {
    overflow: hidden;
}

    .options {
        transform: translateY(0);

        transition: all 0.2s ease-out;
    }

.option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 8px;

    background-color: var(--input-color);

    padding: 8px 12px;

    cursor: pointer;

    transition: background-color 0.2s ease;

    &:hover {
        background-color: var(--input-color-hover);
    }

    &:last-child {
        border-radius: 0 0 8px 8px;
    }
}

    .option_icon {
        width: 12.25px;
    }

.invisible {
    pointer-events: none;
    transition: all 0.2s ease-out;
}

.transform_animation {
    transform: translateY(-100%);
}
</style>../../interfaces/IOption