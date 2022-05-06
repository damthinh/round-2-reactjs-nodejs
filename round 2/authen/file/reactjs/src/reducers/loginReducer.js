import * as types from '../constants'
const initialState = {
    listItem: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errorMessage: null,
    userName: '',
    role: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
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
        case types.LOGIN_ITEM_FAILURE:
        case types.LOGOUT_ITEM_FAILURE:
        case types.REGISTER_ITEM_FAILURE:
            return {
                ...state,
                listItem: [],
                isFetching: false,
                dataFetched: false,
                error: true,
                errorMessage: action.payload
            }
        case types.LOGIN_ITEM_SUCCESS:
        case types.REGISTER_ITEM_SUCCESS:
            return {
                ...state,
                role: action.payload.role,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessage: null,
                userName: action.payload.userName
            }
        case types.LOGOUT_ITEM_SUCCESS:
            return {
                ...state,
                role: '',
                listItem: [],
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
