<template>
  <div class="myarticle row mt-5">
    <ListMyArticle />
    <SideBar />
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import ListMyArticle from '@/components/ListMyArticle.vue'
export default {
  components: {
    SideBar,
    ListMyArticle
  }
}
</script>
