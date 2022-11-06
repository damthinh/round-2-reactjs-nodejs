import * as types from '../constants'
const STATE = {
    listPage: [],
    listExcel: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errorMessage: null,
    activePage: 1,
    totalPage: 1
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
                isFetching:true,
                dataFetched:false,
            }
        case types.PAGINATION_EXCEL_SUCCESS:
            return {
                ...state,
                isFetching:false,
                dataFetched:true,
                error:false,
                errorMessage:null,
                listExcel:action.payload.listExcel,
                listPage:action.payload.listPage,
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
                isFetching:false,
                dataFetched:false,
                error:true,
                errorMessage:action.payload,
            }
        case types.UPLOAD_EXCEL_SUCCESS:
        case types.ADD_EXCEL_SUCCESS:
        case types.UPDATE_EXCEL_SUCCESS:
        case types.DELETE_EXCEL_SUCCESS:
            return {
                ...state,
                isFetching:false,
                dataFetched:true,
                error:false,
                errorMessage:null,
            }

        default:
            return state
    }
}
