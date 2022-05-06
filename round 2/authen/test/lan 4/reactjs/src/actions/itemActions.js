import * as types from '../constants'

export function getItemRequest(payload) {
    return{
        type: types.GET_ITEM_REQUEST,
        payload
    }
}
export function getItemSuccess(payload) {
    return{
        type: types.GET_ITEM_SUCCESS,
        payload
    }
}
export function getItemFailure(payload) {
    return{
        type: types.GET_ITEM_FAILURE,
        payload
    }
}
// add

export function addItemRequest(payload) {
    return{
        type: types.ADD_ITEM_REQUEST,
        payload
    }
}
export function addItemSuccess(payload) {
    return{
        type: types.ADD_ITEM_SUCCESS,
        payload
    }
}
export function addItemFailure(payload) {
    return{
        type: types.ADD_ITEM_FAILURE,
        payload
    }
}
// update

export function updateItemRequest(payload) {
    return{
        type: types.UPDATE_ITEM_REQUEST,
        payload
    }
}
export function updateItemSuccess(payload) {
    return{
        type: types.UPDATE_ITEM_SUCCESS,
        payload
    }
}
export function updateItemFailure(payload) {
    return{
        type: types.UPDATE_ITEM_FAILURE,
        payload
    }
}
// delete

export function deleteItemRequest(payload) {
    return{
        type: types.DELETE_ITEM_REQUEST,
        payload
    }
}
export function deleteItemSuccess(payload) {
    return{
        type: types.DELETE_ITEM_SUCCESS,
        payload
    }
}
export function deleteItemFailure(payload) {
    return{
        type: types.DELETE_ITEM_FAILURE,
        payload
    }
}
// login

export function loginUserRequest(payload) {
    return{
        type: types.LOGIN_USER_REQUEST,
        payload
    }
}
export function loginUserSuccess(payload) {
    return{
        type: types.LOGIN_USER_SUCCESS,
        payload
    }
}
export function loginUserFailure(payload) {
    return{
        type: types.LOGIN_USER_FAILURE,
        payload
    }
}
// register

export function registerUserRequest(payload) {
    return{
        type: types.REGISTER_USER_REQUEST,
        payload
    }
}
export function registerUserSuccess(payload) {
    return{
        type: types.REGISTER_USER_SUCCESS,
        payload
    }
}
export function registerUserFailure(payload) {
    return{
        type: types.REGISTER_USER_FAILURE,
        payload
    }
}
