<template>
  <div>
    <h1>{{ $store.state.post.limit }}</h1>
    <h1>Post page</h1>
    <my-input
        v-focus
        :model-value="searchQuery "
        @update:model-value="setSearchQuery"
    />
    <div class="app__btns">
      <my-button
          @click="visibleDialog = true">
        Create post
      </my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="visibleDialog">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <h4 v-if="isLoading">Loading...</h4>
    <post-list
        v-else
        :posts="filteredPosts"
        @remove="removePost"
    />
    <div v-intersection="loadMorePosts" ref="observer" class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="page in totalPages"-->
    <!--          :key="page"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--            'current-page': page === currentPage-->
    <!--          }"-->
    <!--          @click="changePage(page)"-->
    <!--      >-->
    <!--        {{ page  }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>


<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  components: {PostForm, PostList},
  data() {
    return {
      visibleDialog: false
    }
  },
  methods: {
    ...mapMutations({
      setCurrentPage: 'post/setCurrentPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post)
      this.visibleDialog = false
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id)
    }
    // changePage(page) {
    //   this.currentPage = page
    // },
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isLoading: state => state.post.isLoading,
      searchQuery: state => state.post.searchQuery,
      selectedSort: state => state.post.selectedSort,
      currentPage: state => state.post.currentPage,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      filteredPosts: 'post/filteredPosts'
    })
  },
  watch: {
    // currentPage() {
    //   this.fetchPosts()
    // }
  }
}
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

/*.observer {*/
/*  height: 30px;*/
/*  background-color: greenyellow;*/
/*}*/
</style>
