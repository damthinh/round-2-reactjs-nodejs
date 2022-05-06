import * as types from "../constants"

const STATE = {
    listItem: [],
    isFetching: false,
    dataFetChed: false,
    error: false,
    errorMesage: null,
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
                ...state
            }
        case types.SEARCH_ITEM_FAILURE:
        case types.ADD_ITEM_FAILURE:
        case types.UPDATE_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
        case types.DELETEONEIMG_ITEM_FAILURE:
            return {
                ...state,
                error:true,
                dataFetChed:false,
                errorMesage:action.payload
                
            }
        case types.SEARCH_ITEM_SUCCESS:
            return {
                ...state,
                dataFetChed:true,
                isFetching:false,
                error:false,
                errorMesage:null,
                listItem : action.payload.listItem,
                textSearch : action.payload.textSearch,
            }
        case types.ADD_ITEM_SUCCESS:
        case types.UPDATE_ITEM_SUCCESS:
        case types.DELETE_ITEM_SUCCESS:
        case types.DELETEONEIMG_ITEM_SUCCESS:
            return {
                ...state,
                dataFetChed:true,
                isFetching:false,
            }

        default:
            return state
    }
}
