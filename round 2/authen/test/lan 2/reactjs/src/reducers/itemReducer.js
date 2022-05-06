import * as types from '../constants'
const initialState = {
    listItem: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errorMessage: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_ITEM_REQUEST:
        case types.ADD_ITEM_REQUEST:
        case types.UPDATE_ITEM_REQUEST:
        case types.DELETE_ITEM_REQUEST:
        case types.LOGIN_USER_REQUEST:
        case types.REGISTER_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
                dataFetched: false,
                error: false,
                errorMessage: null
            }
        case types.GET_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                listItem: action.payload,
                error: false,
                errorMessage: null
            }
        case types.GET_ITEM_FAILURE:
        case types.ADD_ITEM_FAILURE:
        case types.UPDATE_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
        case types.LOGIN_USER_FAILURE:
        case types.REGISTER_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
                errorMessage: action.payload

            }
        case types.ADD_ITEM_SUCCESS:
        case types.UPDATE_ITEM_SUCCESS:
        case types.DELETE_ITEM_SUCCESS:
        case types.LOGIN_USER_SUCCESS:
        case types.REGISTER_USER_SUCCESS:
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
