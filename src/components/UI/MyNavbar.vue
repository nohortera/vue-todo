<template>
  <div class="navbar">
    <h2 class="navbar__header" @click="$router.push('/')">Vue 3</h2>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">
        Posts
      </my-button>
      <my-button @click="$router.push('/about')">
        About
      </my-button>
      <my-button @click="$router.push('/store')">
        Store
      </my-button>
      <my-button @click="$router.push('/composition')">
        Composition
      </my-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: goldenrod;
  box-shadow: 0 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  justify-content: space-between;
}

.navbar__btns {
  display: flex;
  gap: 10px;
}

.navbar__header {
  color: teal;
}
</style>
