<template>
  <div class="col-3 bg-light rounded sidebar p-3">
    <div class="form-group d-flex flex-column">
      <input type="text" class="form-control" placeholder="Search...">
      <button class="btn btn-primary btn-sm mt-2">Go</button>
    </div>
    <h3>Latest Article</h3>
    <ul>
      <li v-for="article in listArticle" :key="article._id"><router-link :to="'/article/' + article._id">{{ article.title }}</router-link></li>
    </ul>
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
    this.getLatestArticle()
  },
  methods: {
    getLatestArticle () {
      axios({
        url: 'http://blog-engine-server.pemmz-palzu.site/article',
        method: 'get'
      })
        .then(response => {
          if (response.data.length > 5 || this.listArticle.length > 4) {
            this.listArticle = response.data.slice(response.data.length - 5).reverse()
          } else {
            this.listArticle = response.data.reverse()
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
