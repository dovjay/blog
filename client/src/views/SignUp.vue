<template>
  <div class="signup w-50 mx-auto">
    <h1 class="text-center mt-5">Sign Up</h1>
    <form @click.prevent>
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" type="text" placeholder="Input your name..." v-model="name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input class="form-control" type="email" placeholder="Input your email..." v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input class="form-control" type="password" placeholder="Input your password..." v-model="password">
      </div>
      <button class="btn btn-primary" @click="signUp">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      axios({
        url: 'http://blog-engine-server.pemmz-palzu.site/user/signup',
        method: 'post',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          console.log(response)
          this.$router.push('/signin')
        })
        .catch(error => {
          this.error = error
          console.log(error)
        })
    }
  }
}
</script>
