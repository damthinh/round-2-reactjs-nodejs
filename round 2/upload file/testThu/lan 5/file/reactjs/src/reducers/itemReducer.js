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
        case types.UPDATE_ITEM_REQUEST:
        case types.DELETE_ITEM_REQUEST:
        case types.DELETEONEIMG_ITEM_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case types.SEARCH_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null,
                listItem: action.payload.listItem,
                textSearch: action.payload.textSearch,

            }
        case types.SEARCH_ITEM_FAILURE:
        case types.ADD_ITEM_FAILURE:
        case types.UPDATE_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
        case types.DELETEONEIMG_ITEM_FAILURE:
            return {
                ...state,
                dataFetched: false,
                error: true,
                errorMessage: action.payload

            }
        case types.ADD_ITEM_SUCCESS:
        case types.UPDATE_ITEM_SUCCESS:
        case types.DELETE_ITEM_SUCCESS:
        case types.DELETEONEIMG_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null
            }

        default:
            return state
    }
}
