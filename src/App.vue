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
    background-color: #03001C;
    font-size: 18px;
}
*::-webkit-scrollbar {
  width: 0;
}
</style>
