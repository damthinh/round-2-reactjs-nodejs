import * as types from '../constants'
export function paginationExcelRequest(payload) {
    return{
        type:types.PAGINATION_EXCEL_REQUEST,
        payload
    }
}
export function paginationExcelSuccess(payload) {
    return{
        type:types.PAGINATION_EXCEL_SUCCESS,
        payload
    }
}
export function paginationExcelFailure(payload) {
    return{
        type:types.PAGINATION_EXCEL_FAILURE,
        payload
    }
}
// upload

export function uploadExcelRequest(payload) {
    return{
        type:types.UPLOAD_EXCEL_REQUEST,
        payload
    }
}
export function uploadExcelSuccess(payload) {
    return{
        type:types.UPLOAD_EXCEL_SUCCESS,
        payload
    }
}
export function uploadExcelFailure(payload) {
    return{
        type:types.UPLOAD_EXCEL_FAILURE,
        payload
    }
}
// add

export function addExcelRequest(payload) {
    return{
        type:types.ADD_EXCEL_REQUEST,
        payload
    }
}
export function addExcelSuccess(payload) {
    return{
        type:types.ADD_EXCEL_SUCCESS,
        payload
    }
}
export function addExcelFailure(payload) {
    return{
        type:types.ADD_EXCEL_FAILURE,
        payload
    }
}
// update

export function updateExcelRequest(payload) {
    return{
        type:types.UPDATE_EXCEL_REQUEST,
        payload
    }
}
export function updateExcelSuccess(payload) {
    return{
        type:types.UPDATE_EXCEL_SUCCESS,
        payload
    }
}
export function updateExcelFailure(payload) {
    return{
        type:types.UPDATE_EXCEL_FAILURE,
        payload
    }
}
// delete

export function deleteExcelRequest(payload) {
    return{
        type:types.DELETE_EXCEL_REQUEST,
        payload
    }
}
export function deleteExcelSuccess(payload) {
    return{
        type:types.DELETE_EXCEL_SUCCESS,
        payload
    }
}
export function deleteExcelFailure(payload) {
    return{
        type:types.DELETE_EXCEL_FAILURE,
        payload
    }
}