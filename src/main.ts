import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import icons from './fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add({ ...icons })

import './style.css'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .component("font-awesome", FontAwesomeIcon)
    .mount('#app')
