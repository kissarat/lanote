const NotFound = {
  template: `<div class="error-page not-found">
      <h1>404</h1>
      <h3>Not Found</h3>
    </div>`
}

const App = {
  template: `<main class="segment ui">
    <router-view></router-view>
</main>`
}

let routes = {
  '/': Note,
  '/login': Login,
  '/register': Login,
  '*': NotFound
}

const routeList = Object.keys(routes).map(key => ({
  path: key,
  component: routes[key],
}))

function main() {
  const router = new VueRouter({
    mode: 'history',
    routes: routeList
  })
  Vue.use(router)

  window.vue = new Vue({
    router,
    render: h => h(App)
  })
      .$mount('#app')
}

document.addEventListener('DOMContentLoaded', main)
