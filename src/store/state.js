const state = {
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
}

export default state
