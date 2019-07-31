import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import EventBus from '../EventBus'

Vue.config.productionTip = false

Vue.prototype.$bus = EventBus

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')