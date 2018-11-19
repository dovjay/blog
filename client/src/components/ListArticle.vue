<template>
  <div class="listarticle col mr-3 p-4 bg-light rounded">
    <div v-for="article in listArticle" :key="article.id" class="p-3 border-bottom">
      <h3><router-link :to="'/article/' + article._id">{{ article.title }}</router-link></h3>
      <div class="row ml-2 text-muted">
        <p>{{ article.author.name }}</p>
        <p class="ml-5">{{ article.timestamp }}</p>
      </div>
      <p>{{ article.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listArticle: []
    }
  },
  created () {
    axios({
      url: 'http://blog-engine-server.pemmz-palzu.site/article',
      method: 'get'
    })
      .then(response => {
        this.listArticle = response.data.reverse()
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
