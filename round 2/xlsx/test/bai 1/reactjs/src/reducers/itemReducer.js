import * as types from '../constants'
const STATE = {
    listPage: [],
    listExcel: [],
    isFetching: false,
    dataFeched: false,
    error: false,
    errorMessage: null,
    totalPage: 1,
    activePage: 1
}

export default (state = STATE, action) => {
    switch (action.type) {

        case types.PAGINATION_EXCEL_REQUEST:
        case types.UPLOAD_EXCEL_REQUEST:
        case types.ADD_EXCEL_REQUEST:
        case types.UPDATE_EXCEL_REQUEST:
        case types.DELETE_EXCEL_REQUEST:
            return {
                ...state,
                isFetching:true
            }
        case types.PAGINATION_EXCEL_SUCCESS:
            return {
                ...state,
                isFetching:true,
                dataFeched:true,
                error:false,
                errorMessage:null,
                listPage:action.payload.listPage,
                listExcel:action.payload.listExcel,
                activePage:action.payload.activePage,
                totalPage:action.payload.totalPage,
            }
        case types.PAGINATION_EXCEL_FAILURE:
        case types.UPLOAD_EXCEL_FAILURE:
        case types.ADD_EXCEL_FAILURE:
        case types.UPDATE_EXCEL_FAILURE:
        case types.DELETE_EXCEL_FAILURE:
            return {
                ...state,
                isFetching:true,
                dataFeched:false,
                error:true,
                errorMessage:action.payload,
            }
        case types.UPLOAD_EXCEL_SUCCESS:
        case types.ADD_EXCEL_SUCCESS:
        case types.UPDATE_EXCEL_SUCCESS:
        case types.DELETE_EXCEL_SUCCESS:
            return {
                ...state,
                isFetching:true,
                dataFeched:true,
                error:false,
                errorMessage:null,
            }

        default:
            return state
    }
}
