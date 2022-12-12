<template>
  <div>
    <h1>Post page</h1>
    <my-input
        v-focus
        v-model="searchQuery "
    />
    <div class="app__btns">
      <my-button
          @click="visibleDialog = true">
        Create post
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="visibleDialog">
      <post-form
          @create="createNewPost"
      />
    </my-dialog>
    <h4 v-if="isLoading">Loading...</h4>
    <post-list
        v-else
        :posts="filteredPosts"
        @remove="removePost"
    />
    <div v-intersection="loadMorePosts" ref="observer" class="observer"></div>
  </div>
</template>


<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import {usePosts} from "@/hooks/usePosts";
import {useSortPosts} from "@/hooks/useSort";
import {useFilterPosts} from "@/hooks/useFilter";
export default {
  components: {PostForm, PostList},
  data() {
    return {
      visibleDialog: false,
      sortOptions: [
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By body'}
      ]
    }
  },
  methods: {
    createNewPost(post) {
      this.createPost(post)
      this.visibleDialog = false
    }
  },
  setup() {
    const {posts, isLoading, loadMorePosts, createPost, removePost} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortPosts(posts)
    const {filteredPosts, searchQuery} = useFilterPosts(sortedPosts)

    return {
      isLoading,
      selectedSort,
      filteredPosts,
      searchQuery,
      loadMorePosts,
      createPost,
      removePost
    }
  }
}
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
