<template>
  <div id="nav" class="nav p-3 bg-primary ">
    <router-link class="text-light" to="/">Home</router-link>
    <div class="ml-auto" v-if="isLogin">
      <router-link class="text-light" to="/my-article">My Articles</router-link> &nbsp; | &nbsp;
      <router-link class="text-light" to="/create">Write New Article</router-link> &nbsp; | &nbsp;
      <a href="#" @click="signOut" class="text-light">Sign Out</a>
    </div>
    <div class="ml-auto" v-else>
    <router-link class="text-light" to="/signin">Sign In</router-link> &nbsp; | &nbsp;
    <router-link class="text-light" to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isLogin'],
  methods: {
    signOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      this.$emit('sign-out')
      this.$router.replace('/signin')
    }
  }
}
</script>
