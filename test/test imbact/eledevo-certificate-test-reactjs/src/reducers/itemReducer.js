import *as types from "../constants"

const STATE = {
    listItem: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errorMessage: null,
    activePage: 1,
    totalPage: 1,
    textSearch: '',
    id: '',
    add: ''
}

export default (state = STATE, action) => {
    switch (action.type) {
        case types.PAGINATION_ITEM_REQUEST:
        case types.ADD_ITEM_REQUEST:
        case types.PUT_ITEM_REQUEST:
        case types.DELETE_ITEM_REQUEST:
        case types.SEARCH_ITEM_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.PAGINATION_ITEM_SUCCESS:
            return {
                ...state,
                activePage: action.payload.activePage,
                totalPage: action.payload.totalPage,
                listItem: action.payload.listItem,
                id: action.payload.id,
                isFetching: false
            }
        case types.PAGINATION_ITEM_FAILURE:
        case types.ADD_ITEM_FAILURE:
        case types.PUT_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
        case types.SEARCH_ITEM_FAILURE:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }
        case types.PUT_ITEM_SUCCESS:
        case types.DELETE_ITEM_SUCCESS:
        case types.ADD_ITEM_SUCCESS:
            return {
                ...state,
                activePage: action.payload.activePage,
                totalPage: action.payload.totalPage,
                listItem: action.payload.listItem,
                id: action.payload.id,
            }
        case types.SEARCH_ITEM_SUCCESS:
            return {
                ...state,
                textSearch: action.payload.textSearch,
            }
        default:
            return state
    }
}
