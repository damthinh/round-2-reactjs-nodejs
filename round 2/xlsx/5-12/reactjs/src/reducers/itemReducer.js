import * as types from "../constants"

const STATE = {
    listItem: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errorMessage: null,
}

export default (state = STATE, action) => {
    switch (action.type) {

        case types.GET_EXCEL_REQUEST:
        case types.ADD_EXCEL_REQUEST:
        case types.UPDATE_EXCEL_REQUEST:
        case types.UPLOAD_EXCEL_REQUEST:
        case types.DELETE_EXCEL_REQUEST:
            return {
                ...state,
                isFetching:false
            }
        case types.GET_EXCEL_SUCCESS:
            return {
                ...state,
                isFetching:true,
                error:false,
                errorMessage:null,
                listItem:action.payload.listItem,
            }
        case types.GET_EXCEL_FAILURE:
        case types.ADD_EXCEL_FAILURE:
        case types.UPDATE_EXCEL_FAILURE:
        case types.UPLOAD_EXCEL_FAILURE:
        case types.DELETE_EXCEL_FAILURE:
            return {
                ...state,
                dataFetched:false,
                error:true,
                errorMessage:action.payload
            }
        case types.ADD_EXCEL_SUCCESS:
        case types.UPDATE_EXCEL_SUCCESS:
        case types.UPLOAD_EXCEL_SUCCESS:
        case types.DELETE_EXCEL_SUCCESS:
            return {
                ...state,
                isFetching:true,
                dataFetched:true,
            }

        default:
            return state
    }
}
