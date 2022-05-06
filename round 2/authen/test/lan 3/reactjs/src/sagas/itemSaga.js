import * as types from '../constants'
import * as actions from '../actions/itemActions' 
import { put, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* getItemSaga(action) {
    try {
        let res = yield callApi(types.HTTP_READ,'')
        yield put (actions.getItemSuccess(res))
    } catch (error) {
        yield put (actions.getItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let name = action.payload.name
        yield callApi(types.HTTP_CREATE,'',{name:name})
        yield put (actions.addItemSuccess())
        yield put(actions.getItemRequest())
    } catch (error) {
        yield put (actions.addItemFailure(error))
    }
}
function* updateItemSaga(action) {
    try {
        let id = action.payload.id
        let name = action.payload.name
        yield callApi(types.HTTP_UPDATE,id,{name:name})
        yield put (actions.updateItemSuccess())
        yield put(actions.getItemRequest())
    } catch (error) {
        yield put (actions.updateItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put (actions.deleteItemSuccess())
        yield put(actions.getItemRequest())
    } catch (error) {
        yield put (actions.deleteItemFailure(error))
    }
}
export const itemSaga =[
    takeEvery(types.GET_ITEM_REQUEST,getItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.UPDATE_ITEM_REQUEST,updateItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
]