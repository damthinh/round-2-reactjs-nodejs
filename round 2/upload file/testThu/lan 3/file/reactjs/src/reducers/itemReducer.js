import * as types from '../constants'

const STATE = {
    listItem :[],
    isFetching: false,
    dataFetched : false,
    error:false,
    errorMessage: null,
    textSearch : ''
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
                isFetching:true,
                dataFetched:false,
            }
        case types.SEARCH_ITEM_SUCCESS:
            return {
                ...state,
                isFetching:false,
                dataFetched:true,
                textSearch : action.payload.textSearch,
                listItem : action.payload.listItem,
            }
        case types.SEARCH_ITEM_FAILURE:
        case types.ADD_ITEM_FAILURE:
        case types.UPDATE_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
        case types.DELETEONEIMG_ITEM_FAILURE:
            return {
                ...state,
                dataFetched:false,
                error:true,
                errorMessage:action.payload
            }
        case types.ADD_ITEM_SUCCESS:
        case types.UPDATE_ITEM_SUCCESS:
        case types.DELETE_ITEM_SUCCESS:
        case types.DELETEONEIMG_ITEM_SUCCESS:
            return {
                ...state,
                dataFetched:true
            }

        default:
            return state
    }
}
