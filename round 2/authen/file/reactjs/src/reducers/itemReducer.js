import * as types from '../constants'
const initialState = {
    listItem: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errorMessage: null,
    userName: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_ITEM_REQUEST:
        case types.ADD_ITEM_REQUEST:
        case types.UPDATE_ITEM_REQUEST:
        case types.DELETE_ITEM_REQUEST:
        case types.LOGIN_ITEM_REQUEST:
        case types.LOGOUT_ITEM_REQUEST:
        case types.REGISTER_ITEM_REQUEST:
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
            return {
                ...state,
                listItem :[],
                isFetching: false,
                dataFetched: false,
                error: true,
                errorMessage: action.payload

            }
        case types.ADD_ITEM_FAILURE:
        case types.UPDATE_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
        case types.LOGIN_ITEM_FAILURE:
        case types.LOGOUT_ITEM_FAILURE:
        case types.REGISTER_ITEM_FAILURE:
            return {
                ...state,
                listItem:[],
                isFetching: false,
                dataFetched: false,
                error: true,
                errorMessage: action.payload
            }
        case types.ADD_ITEM_SUCCESS:
        case types.UPDATE_ITEM_SUCCESS:
        case types.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null
            }
        case types.LOGIN_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null,
                userName: action.payload.userName
            }
        case types.REGISTER_ITEM_SUCCESS:
            return {
                ...state,
                listItem:[],
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null,
                userName: action.payload
            }
        case types.LOGOUT_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null,
                userName: ''
            }

        default:
            return state
    }
}
