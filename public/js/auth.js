const Login = {
  template: `
<form id="page-login" class="ui form">
  <h1>{{ register ? 'Register' : 'Login' }}</h1>
  <div class="field">
      <input v-model="username" placeholder="Username"/>
  </div>
  <div class="field">
      <input v-model="password" type="password" placeholder="Password"/>
  </div>
  <div class="control">
    <button type="button" v-on:click="submit()">{{ register ? 'Register' : 'Login' }}</button>
    <router-link v-bind:to="register ? '/login' : '/register'">{{ register ? 'Login' : 'Register' }}</router-link>
  </div>
</form>`,

  data() {
    return {
      username: '',
      password: '',
    }
  },

  computed: {
    register() {
      return '/register' === this.$route.path
    }
  },

  methods: {
    async submit() {
      const r = await api('POST', this.register ? '/api/user' : '/api/login', null, {
        username: this.username,
        password: this.password,
      })
      if (r.success) {
        this.$router.push()
      }
    }
  }
}
