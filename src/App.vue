<template>
    <div>
        <HeaderTabs />
        <router-view v-slot="{ Component }">
            <keep-alive>
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

export default defineComponent({
    name: 'App',
    components: {
        HeaderTabs,
        MyProduct,
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
    --purple: #CCCCFF;
    --green: #02a499;
    --yellow: #f8b425;
    --red: #ec4561;
    --tag_background: #434658;
    --placeholder: #797D7F;
}
</style>
