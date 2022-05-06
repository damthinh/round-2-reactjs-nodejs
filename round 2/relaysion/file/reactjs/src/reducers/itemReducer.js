import * as types from '../constants'
const initialState = {
    listGV: [],
    listHS: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errorMessage: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_ALL_REQUEST:
        case types.ADD_GV_REQUEST:
        case types.UPDATE_GV_REQUEST:
        case types.DELETE_GV_REQUEST:
        case types.ADD_HS_REQUEST:
        case types.UPDATE_HS_REQUEST:
        case types.DELETE_HS_REQUEST:
        case types.DELETE_ONEGVOFHS_REQUEST:
        case types.DELETE_ONEHSOFGV_REQUEST:
            return {
                ...state,
                isFetching: true,
                dataFetched: false,
                error: false,
                errorMessage: null
            }
        case types.GET_ALL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                listHS: action.payload.listHS,
                listGV: action.payload.listGV,
                error: false,
                errorMessage: null
            }
        case types.GET_ALL_FAILURE:
        case types.ADD_GV_FAILURE:
        case types.UPDATE_GV_FAILURE:
        case types.DELETE_GV_FAILURE:
        case types.ADD_HS_FAILURE:
        case types.UPDATE_HS_FAILURE:
        case types.DELETE_HS_FAILURE:
        case types.DELETE_ONEGVOFHS_FAILURE:
        case types.DELETE_ONEHSOFGV_FAILURE:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
                errorMessage: action.payload

            }
        case types.ADD_GV_SUCCESS:
        case types.UPDATE_GV_SUCCESS:
        case types.DELETE_GV_SUCCESS:
        case types.ADD_HS_SUCCESS:
        case types.UPDATE_HS_SUCCESS:
        case types.DELETE_HS_SUCCESS:
        case types.DELETE_ONEGVOFHS_SUCCESS:
        case types.DELETE_ONEHSOFGV_SUCCESS:
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
