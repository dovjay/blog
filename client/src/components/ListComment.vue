<template>
  <div class="listcomment">
    <h4>Comment:</h4>
    <div class="border-bottom w-50 p-3 mt-3 row" v-for="(comment, index) in listComment" :key="index">
      <div class="the-comment col-md-6">
        <h4>{{ comment.writer.name }}</h4>
        <p>{{ comment.content }}</p>
      </div>
      <div class="delete-button col-md-6 text-right" v-if="comment.writer.name == name">
        <button type="button" class="btn btn-outline-danger ml-auto" @click="deleteComment(comment._id)"><i class="far fa-trash-alt"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listcomment',
  data () {
    return {
      listComment: [],
      name: localStorage.getItem('name')
    }
  },
  methods: {
    getComment () {
      axios({
        url: 'http://blog-engine-server.pemmz-palzu.site/comment',
        method: 'get',
        headers: { articleId: this.$route.params.id }
      })
        .then(response => {
          this.listComment = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteComment (id) {
      if (confirm('Are you sure want to delete this comment?')) {
        axios({
          url: 'http://blog-engine-server.pemmz-palzu.site/comment',
          method: 'delete',
          headers: { token: localStorage.getItem('token') },
          data: { id }
        })
          .then(response => {
            this.getComment()
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  created () {
    this.getComment()
  }
}
</script>
