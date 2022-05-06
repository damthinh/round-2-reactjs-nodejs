import * as types from '../constants'

export function searchItemRequest(payload) {
    return{
        type : types.SEARCH_ITEM_REQUEST,
        payload
    }
}

export function searchItemSuccess(payload) {
    return{
        type : types.SEARCH_ITEM_SUCCESS,
        payload
    }
}

export function searchItemFailure(payload) {
    return{
        type : types.SEARCH_ITEM_FAILURE,
        payload
    }
}
// add

export function addItemRequest(payload) {
    return{
        type : types.ADD_ITEM_REQUEST,
        payload
    }
}

export function addItemSuccess(payload) {
    return{
        type : types.ADD_ITEM_SUCCESS,
        payload
    }
}

export function addItemFailure(payload) {
    return{
        type : types.ADD_ITEM_FAILURE,
        payload
    }
}
// put

export function putItemRequest(payload) {
    return{
        type : types.PUT_ITEM_REQUEST,
        payload
    }
}

export function putItemSuccess(payload) {
    return{
        type : types.PUT_ITEM_SUCCESS,
        payload
    }
}

export function putItemFailure(payload) {
    return{
        type : types.PUT_ITEM_FAILURE,
        payload
    }
}
// delete

export function deleteItemRequest(payload) {
    return{
        type : types.DELETE_ITEM_REQUEST,
        payload
    }
}

export function deleteItemSuccess(payload) {
    return{
        type : types.DELETE_ITEM_SUCCESS,
        payload
    }
}

export function deleteItemFailure(payload) {
    return{
        type : types.DELETE_ITEM_FAILURE,
        payload
    }
}
// deleteOneImg

export function deleteOneImgItemRequest(payload) {
    return{
        type : types.DELETEONEIMG_ITEM_REQUEST,
        payload
    }
}

export function deleteOneImgItemSuccess(payload) {
    return{
        type : types.DELETEONEIMG_ITEM_SUCCESS,
        payload
    }
}

export function deleteOneImgItemFailure(payload) {
    return{
        type : types.DELETEONEIMG_ITEM_FAILURE,
        payload
    }
}