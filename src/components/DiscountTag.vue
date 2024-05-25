<template>
    <div class="discount_tag" :class="tag_color">
        <span class="discount_text" :class="tag_color != 'product_white' ? 'text_white' : 'text_black'" >{{ discount }}%</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DiscountTag',
    props: {
        discount: {
            type: String,
            required: true
        },
        tag_color: {
            type: String,
            required: true
        }
    },
})
</script>

<style scoped>
.discount_tag {
    display: flex;

    padding: 2px 4px;
    border-radius: 4px;

    width: min-content;
    height: min-content;
}

.discount_text {
    font-size: 12px;
    font-weight: 500;
}

.text_white {
    color: white;
}

.text_black {
    color: var(--card-background)
}
</style>