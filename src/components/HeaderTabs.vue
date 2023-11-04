<template>
    <div class="tabs">
        <router-link
            to="/"
            class="tab"
            :class="isActive('favoriteProducts')"
            @click="setActivetab('favoriteProducts')"
            @mouseover="mouseOver('favoriteProducts')"
            @mouseleave="mouseLeave()"
            @focus="mouseOver('favoriteProducts')"
            @focusout="mouseLeave()"
        >
            Favorite Products
        </router-link>
        <router-link
            to="/products"
            class="tab"
            :class="isActive('products')"
            @click="setActivetab('products')"
            @mouseover="mouseOver('products')"
            @mouseleave="mouseLeave()"
            @focus="mouseOver('products')"
            @focusout="mouseLeave()"
        >
            Products
        </router-link>
        <router-link
            to="/products/update"
            class="tab"
            :class="isActive('updateProducts')"
            @click="setActivetab('updateProducts')"
            @mouseover="mouseOver('updateProducts')"
            @mouseleave="mouseLeave()"
            @focus="mouseOver('updateProducts')"
            @focusout="mouseLeave()"
        >
            Update products
        </router-link>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue'

export default defineComponent ({
    name: 'HeaderTabs',
    data() {
        return {
            activeTab: 'favoriteProducts',
            hoverTab: ''
        }
    },
    methods: {
        isActive(tab: string): string {
            if (this.hoverTab == tab) {
                return 'tab_active'
            }
            else if (this.hoverTab == '' && this.activeTab == tab) {
                return 'tab_active'
            }
            return ''
        },
        setActivetab(tab: string) {
            this.activeTab = tab
        },
        mouseOver(tab: string) {
            this.hoverTab = tab
        },
        mouseLeave() {
            this.hoverTab = ''
        },
    },
})
</script>

<style scoped>
.tabs {
    background-color: var(--header-color);

    margin-bottom: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
}

.tab {
    color: white;
    text-decoration: none;

    padding: 10px 10px;
    border-bottom: 2px solid var(--header-color);

    transition: all .2s;
}

.tab_active {
    color: var(--purple);
    border-bottom: 2px solid var(--purple);
}
</style>
