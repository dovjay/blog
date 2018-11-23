<template>
  <form @click.prevent>
    <div class="form-group">
      <label for="title">Title</label>
      <input class="form-control" type="text" name="title" placeholder="Input the title..." autofocus v-model="article.title">
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea class="form-control" name="content" rows="24" v-model="article.content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary" @click="saveArticle">Save</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      article: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    saveArticle () {
      axios({
        url: 'https://blog-engine-server.pemmz-palzu.site/article',
        method: 'post',
        data: {
          title: this.article.title,
          content: this.article.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$emit('create')
          console.log(this.article)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
