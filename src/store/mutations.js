const mutations = {
    fillUsers(state, data) {
        state.users = data.items
        state.totalItems = data.total_count > 1000 ? 999 : data.total_count
    },
    setSearchParam(state, param) {
        state.searchParam = param
    },
    clearUsers(state) {
        state.users = []
        state.totalItems = null
    },
    setUser(state, id) {
        state.currentUser = state.users.find( i => {
            return i.id === id
        })
    },
    setPage(state, page) {
        state.page = page
    },
    changeOrder(state) {
        state.order = !state.order
    },
    changeFetching(state) {
        state.isFetching = !state.isFetching
    },
    setAlert(state, err) {
        state.error.show = true
        state.error.message = err,
        state.error.type = 'error'
        setTimeout( () => {
            state.error.show = false
            state.error.message = '',
            state.error.type = ''
        }, 4000)
    },
    changePerPageQty(state, value) {
        state.itemsPerPage = value
        state.page = 1
    }
}
export default mutations
