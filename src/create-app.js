import Vue from 'vue'
import Meta from 'vue-meta'

import App from './App.vue'

Vue.use(Meta)

export default () => {
  const app = new Vue({
    render: h => h(App)
  })
  return { app }
}
