import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

const url = 'https://api.github.com/search/users'
let alertTimeout

const store = new Vuex.Store({
    state: {
        users: null,
        totalItems: null,
        page: 1,
        searchParam: '',
        isFetching: false,
        error: {
            show: false,
            message: '',
            type: 'error'
        },
        order: false,
        itemsPerPage: 10
    },
    mutations: {
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
            alertTimeout = window.setTimeout( () => {
                state.error.show = false
                state.error.message = '',
                    state.error.type = ''
            }, 4000)
        },
        changePerPageQty(state, value) {
            state.itemsPerPage = value
            state.page = 1
        }
    },
    actions: {
        retrieveUsers({commit, state}, queries) {
            window.clearTimeout(alertTimeout)
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
                if (!res.data.items.length) {
                    commit('setAlert', 'Данные не найдены')
                }
                if (res.data.total_count > 1000) {
                    commit('setAlert', 'Максимальное количество выводимых резульататов 1000')
                }
            }).catch( err => {
                commit('setAlert', err.message)
                commit('changeFetching')
            })
        }
    },
    getters: {
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
})

export default store
