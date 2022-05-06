import * as types from '../constants'
const STATE = {
    listItem: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errorMessage: null,
    textSearch: ''
}

export default (state = STATE, action) => {
    switch (action.type) {

        case types.SEARCH_ITEM_REQUEST:
        case types.ADD_ITEM_REQUEST:
        case types.PUT_ITEM_REQUEST:
        case types.DELETE_ITEM_REQUEST:
        case types.DELETE_ONEIMG_ITEM_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.SEARCH_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listItem: action.payload.listItem,
                textSearch: action.payload.textSearch,
                dataFetched: true
            }
        case types.SEARCH_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
        case types.ADD_ITEM_FAILURE:
        case types.PUT_ITEM_FAILURE:
        case types.DELETE_ONEIMG_ITEM_FAILURE:
            return {
                ...state,
            }
        case types.ADD_ITEM_SUCCESS:
        case types.PUT_ITEM_SUCCESS:
        case types.DELETE_ITEM_SUCCESS:
        case types.DELETE_ONEIMG_ITEM_SUCCESS:
            return {
                ...state,
                dataFetched: true
            }

        default:
            return state
    }
}
