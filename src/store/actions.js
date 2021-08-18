import axios from "axios";
const url = 'https://api.github.com/search/users'

const actions = {
    retrieveUsers({commit, state}, queries) {
        commit('changeFetching')
        commit('clearUsers')
        if (queries) {
            commit('setSearchParam', queries)
            commit('setPage', 1)
        }
        return axios (url + `?q=${state.searchParam}&per_page=${state.itemsPerPage}&page=${state.page}&sort=repositories&order=${state.order ? 'asc' : 'desc'}`, {
            method: 'GET'
        }).then(res => {
            res.data.items = res.data.items > 1000 ? res.data.items.slice(0,1000) : res.data.items
            commit('fillUsers', res.data)
            commit('changeFetching')
            if (!res.data.items.length && !state.error.show) {
                commit('setAlert', 'Данные не найдены')
            }
            if (res.data.total_count > 1000 && !state.error.show) {
                commit('setAlert', 'Максимальное количество выводимых резульататов 1000')
            }
        }).catch( err => {
            commit('setAlert', err.message)
            commit('changeFetching')
        })
    }
}

export default actions
