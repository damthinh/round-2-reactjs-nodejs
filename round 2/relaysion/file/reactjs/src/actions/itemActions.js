import * as types from '../constants'
export function getAllRequest(payload) {
    return{
        type:types.GET_ALL_REQUEST,
        payload
    }
}
export function getAllSuccess(payload) {
    return{
        type:types.GET_ALL_SUCCESS,
        payload
    }
}
export function getAllFailure(payload) {
    return{
        type:types.GET_ALL_FAILURE,
        payload
    }
}
// add

export function addGVRequest(payload) {
    return{
        type:types.ADD_GV_REQUEST,
        payload
    }
}
export function addGVSuccess(payload) {
    return{
        type:types.ADD_GV_SUCCESS,
        payload
    }
}
export function addGVFailure(payload) {
    return{
        type:types.ADD_GV_FAILURE,
        payload
    }
}
// update

export function updateGVRequest(payload) {
    return{
        type:types.UPDATE_GV_REQUEST,
        payload
    }
}
export function updateGVSuccess(payload) {
    return{
        type:types.UPDATE_GV_SUCCESS,
        payload
    }
}
export function updateGVFailure(payload) {
    return{
        type:types.UPDATE_GV_FAILURE,
        payload
    }
}
// delete

export function deleteGVRequest(payload) {
    return{
        type:types.DELETE_GV_REQUEST,
        payload
    }
}
export function deleteGVSuccess(payload) {
    return{
        type:types.DELETE_GV_SUCCESS,
        payload
    }
}
export function deleteGVFailure(payload) {
    return{
        type:types.DELETE_GV_FAILURE,
        payload
    }
}

// deleteOneHSOfGV

export function deleteOneHSOfGVRequest(payload) {
    console.log('payloadaction',payload);
    return{
        type:types.DELETE_ONEHSOFGV_REQUEST,
        payload
    }
}
export function deleteOneHSOfGVSuccess(payload) {
    return{
        type:types.DELETE_ONEHSOFGV_SUCCESS,
        payload
    }
}
export function deleteOneHSOfGVFailure(payload) {
    return{
        type:types.DELETE_ONEHSOFGV_FAILURE,
        payload
    }
}
// HS

// add

export function addHSRequest(payload) {
    return{
        type:types.ADD_HS_REQUEST,
        payload
    }
}
export function addHSSuccess(payload) {
    return{
        type:types.ADD_HS_SUCCESS,
        payload
    }
}
export function addHSFailure(payload) {
    return{
        type:types.ADD_HS_FAILURE,
        payload
    }
}
// update

export function updateHSRequest(payload) {
    return{
        type:types.UPDATE_HS_REQUEST,
        payload
    }
}
export function updateHSSuccess(payload) {
    return{
        type:types.UPDATE_HS_SUCCESS,
        payload
    }
}
export function updateHSFailure(payload) {
    return{
        type:types.UPDATE_HS_FAILURE,
        payload
    }
}
// delete

export function deleteHSRequest(payload) {
    return{
        type:types.DELETE_HS_REQUEST,
        payload
    }
}
export function deleteHSSuccess(payload) {
    return{
        type:types.DELETE_HS_SUCCESS,
        payload
    }
}
export function deleteHSFailure(payload) {
    return{
        type:types.DELETE_HS_FAILURE,
        payload
    }
}

// deleteOneGVOfHS

export function deleteOneGVOfHSRequest(payload) {
    return{
        type:types.DELETE_ONEGVOFHS_REQUEST,
        payload
    }
}
export function deleteOneGVOfHSSuccess(payload) {
    return{
        type:types.DELETE_ONEGVOFHS_SUCCESS,
        payload
    }
}
export function deleteOneGVOfHSFailure(payload) {
    return{
        type:types.DELETE_ONEGVOFHS_FAILURE,
        payload
    }
}