<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  cursor: pointer;
  background: none;
  color: teal;
  border: 1px solid teal;
  border-radius: 5px;
}

.btn:hover {
  color: white;
  background: teal;
  transition: 0.3s;
}
</style>
