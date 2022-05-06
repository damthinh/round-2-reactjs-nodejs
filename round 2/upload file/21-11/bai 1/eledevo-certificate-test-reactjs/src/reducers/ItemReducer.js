import * as types from '../constants'

const STATE = {
    listItem: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errorMessage: null
}

export default (state = STATE, action) => {
    switch (action.type) {

        case types.GET_ITEM_SUCCESS:
            return {
                ...state,
                listItem: action.payload.listItem
            }
        case types.GET_ITEM_FAILURE:
        case types.ADD_ITEM_FAILURE:
        case types.DELETE_ITEM_FAILURE:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }
        case types.ADD_ITEM_SUCCESS:
        case types.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                dataFetched: true
            }
        default:
            return state
    }
}
