import Vue from 'vue'
import Meta from 'vue-meta'

import App from './App.vue'

Vue.use(Meta)

new Vue({
  render: h => h(App)
}).$mount('#app')
