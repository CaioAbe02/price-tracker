<template>
    <div>
        <HeaderTabs />
        <router-view v-slot="{ Component }">
            <keep-alive :exclude="exludeComponents">
                <component :is="Component" />
            </keep-alive>
        </router-view>

    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue';
import HeaderTabs from './components/HeaderTabs.vue';
import MyProduct from './components/MyProduct.vue';
import { useStore } from '@/store';
import { GET_DATA } from './store/action-types';

export default defineComponent({
    name: 'App',
    components: {
        HeaderTabs,
        MyProduct,
    },
    data() {
        return {
            exludeComponents: ["ShowProduct", "EditProduct", "MyProducts"]
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_DATA)
    },
})
</script>

<style>
* {
    margin: 0;
    font-family: Mukta, sans-serif;
    font-size: 18px;
}
*::-webkit-scrollbar {
  width: 0;
}

html {
    background-color: var(--background-color);
}

:root {
    --header-color: #36394C;
    --background-color: #252735;
    --card-background: #2A3142;
    --input-border: #374151;
    --input-label: #E5E7E9;
    --purple: #9494ff;
    --purple-dark: #7676ff;
    --green: #02a499;
    --yellow: #f8b425;
    --red: #ec4561;
    --tag_background: #434658;
    --placeholder: #797D7F;
}
</style>
