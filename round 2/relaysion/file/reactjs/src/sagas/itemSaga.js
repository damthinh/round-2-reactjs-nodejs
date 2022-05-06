import * as types from '../constants'
import * as actions from '../actions/itemActions' 
import { put, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* getAllSaga(action) {
    try {
        let res = yield callApi(types.HTTP_READ,'')
        console.log('rés',res);
        yield put (actions.getAllSuccess({listGV:res.listGV,listHS:res.listHS}))
    } catch (error) {
        yield put (actions.getAllFailure(error))
    }
}
function* addGVSaga(action) {
    try {
        console.log('action',action.payload);
        yield callApi(types.HTTP_CREATE,'gv',action.payload)
        yield put (actions.addGVSuccess())
        yield put(actions.getAllRequest())
    } catch (error) {
        yield put (actions.addGVFailure(error))
    }
}
function* updateGVSaga(action) {
    try {
        let id = action.payload.id
        console.log(action.payload);
        yield callApi(types.HTTP_UPDATE,`gv/${id}`,action.payload)
        yield put (actions.updateGVSuccess())
        yield put(actions.getAllRequest())
    } catch (error) {
        yield put (actions.updateGVFailure(error))
    }
}
function* deleteGVSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,`gv/${id}`)
        yield put (actions.deleteGVSuccess())
        yield put(actions.getAllRequest())
    } catch (error) {
        yield put (actions.deleteGVFailure(error))
    }
}
function* deleteOneHSOfGVSaga(action) {
    try {
        let {id_GV,key} = action.payload
        console.log('payload',action.payload);
        yield callApi(types.HTTP_DELETE,`gv/${id_GV}/${key}`)
        yield put (actions.deleteOneHSOfGVSuccess())
        yield put(actions.getAllRequest())
    } catch (error) {
        yield put (actions.deleteOneHSOfGVFailure(error))
    }
}
// HS

function* addHSSaga(action) {
    try {
        console.log('action',action.payload);
        yield callApi(types.HTTP_CREATE,'hs',action.payload)
        yield put (actions.addHSSuccess())
        yield put(actions.getAllRequest())
    } catch (error) {
        yield put (actions.addHSFailure(error))
    }
}
function* updateHSSaga(action) {
    try {
        let id = action.payload.id
        let res = yield callApi(types.HTTP_UPDATE,`hs/${id}`,action.payload)
        console.log("res",res);
        yield put (actions.updateHSSuccess())
        yield put(actions.getAllRequest())
    } catch (error) {
        yield put (actions.updateHSFailure(error))
    }
}
function* deleteHSSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,`hs/${id}`)
        yield put (actions.deleteHSSuccess())
        yield put(actions.getAllRequest())
    } catch (error) {
        yield put (actions.deleteHSFailure(error))
    }
}

function* deleteOneGVOfHSSaga(action) {
    try {
        let {id_HS,key} = action.payload
        console.log('payload',action.payload);
        yield callApi(types.HTTP_DELETE,`hs/${id_HS}/${key}`)
        yield put (actions.deleteOneGVOfHSSuccess())
        yield put(actions.getAllRequest())
    } catch (error) {
        yield put (actions.deleteOneGVOfHSFailure(error))
    }
}
export const itemSaga =[
    takeEvery(types.GET_ALL_REQUEST,getAllSaga),
    takeEvery(types.ADD_GV_REQUEST,addGVSaga),
    takeEvery(types.UPDATE_GV_REQUEST,updateGVSaga),
    takeEvery(types.DELETE_GV_REQUEST,deleteGVSaga),
    // hs
    
    takeEvery(types.ADD_HS_REQUEST,addHSSaga),
    takeEvery(types.UPDATE_HS_REQUEST,updateHSSaga),
    takeEvery(types.DELETE_HS_REQUEST,deleteHSSaga),
    takeEvery(types.DELETE_ONEGVOFHS_REQUEST,deleteOneGVOfHSSaga),
    takeEvery(types.DELETE_ONEHSOFGV_REQUEST,deleteOneHSOfGVSaga),
]