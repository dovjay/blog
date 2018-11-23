<template>
  <div class="create-article mt-5 col mr-3 p-4 bg-light rounded">
    <FormCreate @create="getArticle"/>
    <ListArticle ref="list"/>
  </div>  
</template>

<script>
import FormCreate from '@/components/FormCreate.vue'
import ListArticle from '@/components/ListArticle.vue'

export default {
  components: {
    ListArticle,
    FormCreate
  },
  data () {
    return {
      article: {}
    }
  },
  methods: {
    getArticle (detail) {
      this.$refs.list.getArticleList()
    }
  }
}
</script>
