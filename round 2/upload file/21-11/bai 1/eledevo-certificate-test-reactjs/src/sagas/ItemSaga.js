import * as types from '../constants'

import * as actions from '../actions/index'
import { put, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* getItemSaga() {
    try {
        let res = yield callApi(types.HTTP_READ,'')
        console.log("res",res);
        let listItem = res.listItem
        yield put (actions.getItemSuccess({listItem}))
    } catch (error) {
        yield put (actions.getItemFailure({error}))
    }
}
function* addItemSaga(action) {
    try {
        const res = yield callApi(types.HTTP_CREATE,'', action.payload)
        console.log("res",res);
        yield put (actions.addItemSuccess())
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put (actions.addItemFailure({error}))
    }
}

function* deleteItemSaga(action) {
    try {
        const id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put (actions.deleteItemSuccess())
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put (actions.deleteItemFailure({error}))
    }
}
function* updateItemSaga(action) {
    try {
        const id = action.payload.id
        yield callApi(types.HTTP_UPDATE,id,action.payload)
        yield put (actions.updateItemSuccess())
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put (actions.updateItemFailure({error}))
    }
}
// function* name2(action) {
//     try {
        
//     } catch (error) {
        
//     }
// }
export const itemSaga =[
    takeEvery(types.GET_ITEM_REQUEST,getItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
    takeEvery(types.UPDATE_ITEM_REQUEST,updateItemSaga),
]