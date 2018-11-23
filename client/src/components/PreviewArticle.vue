<template>
  <div>
    Preview
    <h1>{{preview.title}}</h1>
    <p>{{preview.content}}</p>
  </div>
</template>

<script>
export default {
  props: ['preview']
}
</script>
