import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import BaiduMap from 'vue-baidu-map'
import interface_1 from './axios/interface_1'
Vue.prototype.$axios = interface_1;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// Vue.use(BaiduMap,{
//     ak:'mbX8N5ftbfXqcHAKGf7DelKxVeXjnFnE'
// })
// Vue.use(VueAxios, axios);