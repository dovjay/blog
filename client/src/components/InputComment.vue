<template>
  <div class="inputcomment mt-5">
    <div class="form-group d-flex">
      <input type="text" class="form-control w-50" v-model="comment" placeholder="Input comment here...">
      <button @click="addComment" class="ml-2 btn btn-primary">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputcomment',
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    addComment () {
      if (localStorage.getItem('token')) {
        axios({
          url: 'http://localhost:3000/comment',
          method: 'post',
          data: {
            content: this.comment,
            articleId: this.$route.params.id
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            console.log(response)
            this.comment = ''
            this.$emit('new-comment')
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$router.push('/signin')
      }
    }
  }
}
</script>
