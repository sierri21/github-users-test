const getters = {
    getUsers(state) {
        return state.users
    },
    getTotalItems(state) {
        return state.totalItems
    },
    getPage(state) {
        return state.page
    },
    isFetching(state) {
        return state.isFetching
    },
    getError(state) {
        return state.error
    }
}

export default getters
