import * as types from '../constants'
export function getItemRequest(payload) {
    return{
        type:types.GET_ITEM_REQUEST,
        payload
    }
}
export function getItemSuccess(payload) {
    return{
        type:types.GET_ITEM_SUCCESS,
        payload
    }
}
export function getItemFailure(payload) {
    return{
        type:types.GET_ITEM_FAILURE,
        payload
    }
}
// login

export function loginItemRequest(payload) {
    return{
        type:types.LOGIN_ITEM_REQUEST,
        payload
    }
}
export function loginItemSuccess(payload) {
    return{
        type:types.LOGIN_ITEM_SUCCESS,
        payload
    }
}
export function loginItemFailure(payload) {
    return{
        type:types.LOGIN_ITEM_FAILURE,
        payload
    }
}

// logout

export function logoutItemRequest(payload) {
    return{
        type:types.LOGOUT_ITEM_REQUEST,
        payload
    }
}
export function logoutItemSuccess(payload) {
    return{
        type:types.LOGOUT_ITEM_SUCCESS,
        payload
    }
}
export function logoutItemFailure(payload) {
    return{
        type:types.LOGOUT_ITEM_FAILURE,
        payload
    }
}
// register

export function registerItemRequest(payload) {
    return{
        type:types.REGISTER_ITEM_REQUEST,
        payload
    }
}
export function registerItemSuccess(payload) {
    return{
        type:types.REGISTER_ITEM_SUCCESS,
        payload
    }
}
export function registerItemFailure(payload) {
    return{
        type:types.REGISTER_ITEM_FAILURE,
        payload
    }
}
// add

export function addItemRequest(payload) {
    return{
        type:types.ADD_ITEM_REQUEST,
        payload
    }
}
export function addItemSuccess(payload) {
    return{
        type:types.ADD_ITEM_SUCCESS,
        payload
    }
}
export function addItemFailure(payload) {
    return{
        type:types.ADD_ITEM_FAILURE,
        payload
    }
}
// update

export function updateItemRequest(payload) {
    return{
        type:types.UPDATE_ITEM_REQUEST,
        payload
    }
}
export function updateItemSuccess(payload) {
    return{
        type:types.UPDATE_ITEM_SUCCESS,
        payload
    }
}
export function updateItemFailure(payload) {
    return{
        type:types.UPDATE_ITEM_FAILURE,
        payload
    }
}
// delete

export function deleteItemRequest(payload) {
    return{
        type:types.DELETE_ITEM_REQUEST,
        payload
    }
}
export function deleteItemSuccess(payload) {
    return{
        type:types.DELETE_ITEM_SUCCESS,
        payload
    }
}
export function deleteItemFailure(payload) {
    return{
        type:types.DELETE_ITEM_FAILURE,
        payload
    }
}