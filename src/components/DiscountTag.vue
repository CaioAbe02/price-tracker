<template>
    <div class="discount_tag" :class="getTagColor()">
        <span class="discount">{{ getDiscount(original_price, current_price) }}</span>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'DiscountTag',
    props: {
        isLowestPrice: {
            default: false,
            type: Boolean
        },
        original_price: {
            required: true,
            type: Number
        },
        new_prices: {
            required: true,
            type: Array as PropType<number[]>,
        }
    },
    data() {
        return {
            current_price: this.new_prices.slice(-1)[0],
            lowest_price: Math.min(...this.new_prices),
        }
    },
    methods: {
        getDiscount(original_price: number, new_price: number): string {
            if (this.isLowestPrice) {
                const discount = (100 - (original_price / this.lowest_price) * 100).toFixed(2)
                return (`${discount}%`)
            }

            const discount = (100 - (original_price / new_price) * 100).toFixed(2)

            if (new_price > original_price) {
                return (`+${discount}%`)
            }
            if (new_price < original_price) {
                return (`${discount}%`)
            }
            return "0%"
        },
        getTagColor(): string {
            const difference = this.original_price - this.current_price

            if ((this.current_price == this.lowest_price && difference != 0) || this.isLowestPrice) {
                return 'discount_tag_yellow'
            }
            else if (difference > 0) {
                return 'discount_tag_green'
            }
            else if (difference < 0) {
                return 'discount_tag_red'
            }
            return 'discount_tag_white'
        },
    }
})
</script>

<style scoped>
.discount_tag {
    display: flex;
    align-items: center;
    justify-content: center;

    width: min-content;
    height: min-content;

    border-radius: 10px;
    padding: 3px 4px;
}

.discount_tag_green {
    background-color: var(--green);
}

.discount_tag_yellow {
    background-color: var(--yellow);
}

.discount_tag_red {
    background-color: var(--red);
}

.discount_tag_white {
    background-color: var(--tag_background);
}

.discount {
    font-size: 12px;
}

span {
    color: white;
}
</style>