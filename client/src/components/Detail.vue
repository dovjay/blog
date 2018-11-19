<template>
  <div class="read-article col mr-3 p-4 bg-light rounded">
    <div class="article">
      <h1>{{ article.title }}</h1>
      <div class="row ml-2 text-muted">
        <p>{{ article.author.name }}</p>
        <p class="ml-5">{{ article.timestamp }}</p>
      </div>
      <p>{{ article.content }}</p>
    </div>
    <div class="comment">
      <Comment/>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue'
export default {
  name: 'detail',
  components: {
    Comment
  },  
  data () {
    return {
      article: {}
    }
  },
  mounted () {
    axios({
      url: `http://blog-engine-server.pemmz-palzu.site/article/${this.$route.params.id}`,
      method: 'get'
    })
      .then(response => {
        this.article = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  watch: {
    '$route.params.id' () {
      axios({
        url: `http://blog-engine-server.pemmz-palzu.site/article/${this.$route.params.id}`,
        method: 'get'
      })
        .then(response => {
          this.article = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
