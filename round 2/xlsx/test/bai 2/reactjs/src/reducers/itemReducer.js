import * as types from '../constants'
const STATE = {
    listPage: [],
    listExcel: [],
    isFetching: false,
    dateFetched: false,
    error: false,
    errorMessage: null,
    totalPage: 1,
    activePage: 1
}

export default (state = STATE, action) => {
    switch (action.type) {

        case types.PAGINATION_EXCEL_REQUEST:
        case types.ADD_EXCEL_REQUEST:
        case types.UPLOAD_EXCEL_REQUEST:
        case types.UPDATE_EXCEL_REQUEST:
        case types.DELETE_EXCEL_REQUEST:
            return {
                ...state,
                isFetching:true,
            }
        case types.PAGINATION_EXCEL_SUCCESS:
            return {
                ...state,
                isFetching:false,
                error:false,
                errorMessage:null,
                listExcel:action.payload.listExcel,
                listPage:action.payload.listPage,
                activePage:action.payload.activePage,
                totalPage:action.payload.totalPage,
            }
        case types.PAGINATION_EXCEL_FAILURE:
        case types.ADD_EXCEL_FAILURE:
        case types.UPLOAD_EXCEL_FAILURE:
        case types.UPDATE_EXCEL_FAILURE:
        case types.DELETE_EXCEL_FAILURE:
            return {
                ...state,
                dateFetched:false,
                error:true,
                errorMessage:action.payload,
            }

        case types.ADD_EXCEL_SUCCESS:
        case types.UPLOAD_EXCEL_SUCCESS:
        case types.UPDATE_EXCEL_SUCCESS:
        case types.DELETE_EXCEL_SUCCESS:
            return {
                ...state,
                isFetching:false,
                error:false,
                errorMessage:null,
            }


        default:
            return state
    }
}
