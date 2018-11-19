<template>
  <div class="create-article mt-5 col mr-3 p-4 bg-light rounded">
    <form @click.prevent>
      <div class="form-group">
        <label for="title">Title</label>
        <input class="form-control" type="text" name="title" placeholder="Input the title..." autofocus v-model="title">
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea class="form-control" name="content" rows="24" v-model="content"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="saveArticle">Save</button>
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
    saveArticle () {
      axios({
        url: 'http://localhost:3000/article',
        method: 'post',
        data: {
          title: this.title,
          content: this.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
