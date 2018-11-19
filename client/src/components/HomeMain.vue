<template>
  <div class="homemain mx-auto">
    <div class="row w-100 mb-2">
      <h1 v-if="name">Hello, {{ name }}!</h1>
    </div>
    <div class="row w-100 mx-auto">
      <ListArticle/>
      <SideBar />
    </div>
  </div>
</template>
<script>
import SideBar from '@/components/SideBar.vue'
import ListArticle from '@/components/ListArticle.vue'
export default {
  data () {
    return {
      name: ''
    }
  },
  components: {
    SideBar,
    ListArticle
  },
  created () {
    if (localStorage.getItem('name')) this.name = localStorage.getItem('name')
  }
}
</script>
