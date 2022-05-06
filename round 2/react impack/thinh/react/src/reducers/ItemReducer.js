import * as types from "../constants" 

const STATE = {
    listItem:[],
    isFetching: false,
    dataFetChed: false,
    error : false,
    errorMessage: null,
    activePage: 1,
    totalPage:1,
    textSearch:''
}

export default (state = STATE, action) => {
    switch (action.type) {

    case types.PAGI_ITEM_SUCCESS:
        return { 
            ...state,
            activePage : action.payload.activePage,
            totalPage : action.payload.totalPage,
            listItem : action.payload.listItem,
            dataFetChed : true
        }
    case types.PAGI_ITEM_FAILURE:
    case types.ADD_ITEM_FAILURE:
    case types.PUT_ITEM_FAILURE:
    case types.DELETE_ITEM_FAILURE:
    case types.SEARCH_ITEM_FAILURE:
        return { 
            ...state,
            error : true,
            errorMessage: action.payload.errorMessage
        }
    
    case types.ADD_ITEM_SUCCESS:
    case types.SEARCH_ITEM_SUCCESS:
        return { 
            ...state,
            textSearch : action.payload.textSearch,
            dataFetChed : true
        }
    case types.DELETE_ITEM_SUCCESS:
    case types.PUT_ITEM_SUCCESS:
        return { 
            ...state,
            dataFetChed : true
        }
    default:
        return state
    }
}
