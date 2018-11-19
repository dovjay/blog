<template>
  <div id="app" class="container">
    <NavBar :isLogin="loginStatus" @sign-out="changeStatus" class="row"/>
    <router-view @login-success="changeStatus"></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'app',
  data () {
    return {
      loginStatus: false
    }
  },
  methods: {
    changeStatus () {
      if (localStorage.getItem('token')) this.loginStatus = true
      else this.loginStatus = false
    }
  },
  created() {
    this.changeStatus()
  },
  watch: {
    loginStatus: function () {
      console.log('loginStatus', this.loginStatus)
    }
  },
  components: {
    NavBar
  }
}
</script>
