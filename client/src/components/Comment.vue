<template>
  <div class="comment">
    <InputComment @new-comment="newComment" v-if="token"/>
    <ListComment ref="ListComment"/>
  </div>
</template>

<script>
import InputComment from '@/components/InputComment.vue'
import ListComment from '@/components/ListComment.vue'
export default {
  name: 'comment',
  components: {
    InputComment,
    ListComment
  },
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    newComment (count) {
      this.$refs.ListComment.getComment()
    }
  }
}
</script>
