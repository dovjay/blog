<template>
  <div class="create-article mt-5">
    <form @click.prevent>
      <div class="form-group">
        <label for="title">Title</label>
        <input class="form-control" type="text" name="title" placeholder="Input the title..." autofocus v-model="title">
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea class="form-control" name="content" rows="24" v-model="content"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="updateArticle">Update</button>
    </form>
  </div>    
</template>

<script>
export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    init () {
      axios({
        url: `http://localhost:3000/article/${this.$route.params.id}`,
        method: 'get'
      })
        .then(response => {
          this.title = response.data.title
          this.content = response.data.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateArticle () {
      axios({
        url: `http://localhost:3000/article`,
        method: 'put',
        data: {
          title: this.title,
          content: this.content,
          id: this.$route.params.id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
          this.$router.push('/my-article')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.init()
  }
}
</script>
