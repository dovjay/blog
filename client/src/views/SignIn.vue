<template>
  <div class="signin w-50 mx-auto">
    <h1 class="text-center mt-5">Sign In</h1>
    <form @click.prevent>
      <div class="form-group">
        <label for="email">Email</label>
        <input class="form-control" type="email" placeholder="Input your email..." v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input class="form-control" type="password" placeholder="Input your password..." v-model="password">
      </div>
      <button class="btn btn-primary" @click="signIn">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      axios({
        url: 'http://localhost:3000/user/signin',
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          this.email = ''
          this.password = ''
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          this.$emit('login-success')
          this.$router.replace({ path: '/' })
        })
        .catch(error => {
          this.error = error
          console.log(error)
        })
    }
  }
}
</script>
