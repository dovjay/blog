<template>
  <div class="listmyarticle col mr-3 p-4 bg-light rounded">
    <div v-if="listArticle.length > 0">
      <div v-for="article in listArticle" :key="article.id" class="p-3">
        <div>
          <h3><router-link :to="'/article/' + article._id">{{ article.title }}</router-link></h3>
          <div class="row text-muted">
            <p class="ml-3">{{ article.timestamp }}</p>
          </div>
          <p>{{ article.content }}</p>
        </div>
        <button class="btn btn-warning" @click="editArticle(article._id)">Edit</button>
        <button class="btn btn-danger ml-3" @click="deleteArticle(article._id)">Delete</button>
      </div>
    </div>
    <div v-else>
      <h3>You dont have any article yet.</h3>
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
  methods: {
    getArticle () {
      axios({
        url: 'http://blog-engine-server.pemmz-palzu.site/article/me',
        method: 'get',
        headers: { token: localStorage.getItem('token') }
      })
        .then(response => {
          this.listArticle = response.data
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    editArticle (id) {
      this.$router.push({
        path: `/edit-article/${id}`
      })
    },
    deleteArticle(id) {
      if (confirm('Are you sure to delete this article?')) {
        axios({
          url: `http://localhost:3000/article`,
          method: 'delete',
          headers: { token: localStorage.getItem('token') },
          data: { articleId: id }
        })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  created () {
    this.getArticle()
  },
  watch: {
    listArticle () {
      this.getArticle()
    }
  }
}
</script>
