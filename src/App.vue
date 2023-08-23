<template>
    <div>
        <HeaderTabs />
        <router-view></router-view>
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
}
</style>
