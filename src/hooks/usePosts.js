import axios from "axios";
import {onMounted, ref} from "vue";

export function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isLoading = ref(true)
    const currentPage = ref(1)
    const fetching = async () => {
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    params: {
                        _limit: limit,
                        _page: currentPage.value || 1
                    }
                }
            )
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = response.data
        } catch (e) {
            console.log(e)
        } finally {
            isLoading.value = false
        }
    }

    const loadMorePosts = async () => {
        try {
            currentPage.value += 1
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    params: {
                        _limit: limit,
                        _page: currentPage.value
                    }
                }
            )
            posts.value = [...posts.value, ...response.data]
        } catch (e) {
            console.log(e)
        }
    }

    const createPost = (post) => {
        posts.value.push(post)
    }

    const removePost = (post) => {
        posts.value = posts.value.filter(el => el.id !== post.id)
    }

    onMounted(fetching)

    return {
        posts, isLoading, totalPages, currentPage, loadMorePosts, createPost, removePost
    }
}
