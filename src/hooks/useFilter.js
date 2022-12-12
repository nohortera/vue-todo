import {computed, ref} from "vue";

export function useFilterPosts(posts) {
    const searchQuery = ref('')
    const filteredPosts = computed(() => {
        return posts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {
        searchQuery, filteredPosts
    }
}
