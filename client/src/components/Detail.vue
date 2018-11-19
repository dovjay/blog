<template>
  <div class="read-article col mr-3 p-4 bg-light rounded">
    <div class="article">
      <h1>{{ article.title }}</h1>
      <div class="row ml-2 text-muted">
        <p>{{ article.author.name }}</p>
        <p class="ml-5">{{ article.timestamp }}</p>
      </div>
      <p v-for="(paragraph, index) in article.content" :key="index">{{ paragraph }}</p>
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
      url: `http://localhost:3000/article/${this.$route.params.id}`,
      method: 'get'
    })
      .then(response => {
        this.article = response.data
        this.article.content = this.article.content.split('\n')
      })
      .catch(error => {
        console.log(error)
      })
  },
  watch: {
    '$route.params.id' () {
      axios({
        url: `http://localhost:3000/article/${this.$route.params.id}`,
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
