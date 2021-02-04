import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import storage from './store'
import VueNear from 'vue-near'
import VueCeramic from './plugins/ceramic'

const app = createApp(App)
const store = createStore(storage)
const router = createRouter({
  history: createWebHistory(),
  routes: import.meta.hot ? [] : routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

if (import.meta.hot) {
  let removeRoutes = []

  for (let route of routes) {
    removeRoutes.push(router.addRoute(route))
  }

  import.meta.hot.accept('./routes.js', ({ routes }) => {
    for (let removeRoute of removeRoutes) removeRoute()
    removeRoutes = []
    for (let route of routes) {
      removeRoutes.push(router.addRoute(route))
    }
    router.replace('')
  })
}

app.use(router)
app.use(store)
app.use(VueNear, {
  // Configures NEAR RPC Provider
  env: process.env.NODE_ENV || 'development',
  config: {
    // Allows your contract to be fixed, or dynamic
    contractName: process.env.NEAR_CONTRACT_ID || 'nearceramictest.t.testnet',
  }
})
app.use(VueCeramic, {
  // Allows gateway configuration based on environment
  env: process.env.NODE_ENV || 'development',

  // Allows gateway override to a specific url {OPTIONAL}
  // apiUrl: 'https://yourEndpoint.com'
})

app.mount('#app')
