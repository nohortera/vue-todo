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
import axios from 'axios'
export default {
  components: {PostForm, PostList},
  data() {
    return {
      posts: [],
      visibleDialog: false,
      isLoading: false,
      searchQuery: '',
      selectedSort: '',
      currentPage: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By body'}
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.visibleDialog = false
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id)
    },
    // changePage(page) {
    //   this.currentPage = page
    // },
    async fetchPosts() {
      try {
        this.isLoading = true
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts',
            {
              params: {
                _limit: this.limit,
                _page: this.currentPage
              }
            }
        )
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert(e.message)
      } finally {
        this.isLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.currentPage += 1
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts',
            {
              params: {
                _limit: this.limit,
                _page: this.currentPage
              }
            }
        )
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert(e.message)
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  updated() {
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    filteredPosts() {
      return this.sortedPosts.filter(post => post.title.includes(this.searchQuery))
    }
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
