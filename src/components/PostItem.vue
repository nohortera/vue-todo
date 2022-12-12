<template>
  <div class="post">
    <div>
      <div>
        <strong>ID:</strong> {{ post.id }}
      </div>
      <div>
        <strong>Title:</strong> {{ post.title }}
      </div>
      <div>
        <strong>Body:</strong> {{ post.body }}
      </div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">
        Open
      </my-button>
      <my-button @click="$emit('remove')">
        Delete
      </my-button>
    </div>
  </div>
</template>

<script>
 export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  border-radius: 5px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
  gap: 10px;
}
</style>
