import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        filteredPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.includes(state.searchQuery))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isLoading = bool
        },
        setSearchQuery(state, query) {
            state.searchQuery = query
        },
        setSelectedSort(state, method) {
            state.selectedSort = method
        },
        setCurrentPage(state, page) {
            state.currentPage = page
        },
        setTotalPages(state, value) {
            state.totalPages = value
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true)
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _limit: state.limit,
                            _page: state.currentPage
                        }
                    }
                )
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setCurrentPage', state.currentPage + 1)
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _limit: state.limit,
                            _page: state.currentPage
                        }
                    }
                )
                commit('setPosts', [...state.posts, ...response.data])
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}
