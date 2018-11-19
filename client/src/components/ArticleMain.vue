<template>
<div class="article-main row">
  <Detail/>
  <SideBar/>
</div>
</template>

<script>
import Detail from '@/components/Detail.vue'
import SideBar from '@/components/SideBar.vue'
export default {
  components: {
    Detail,
    SideBar
  }
}
</script>
