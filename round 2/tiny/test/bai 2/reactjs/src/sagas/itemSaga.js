import * as types from '../constants'
import * as actions from '../actions/itemActions'
import { put, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* getItemSaga(action) {
    try {
        let res = yield callApi(types.HTTP_READ,'')
        let listItem = res
        yield put (actions.getItemSuccess({listItem}))
    } catch (error) {
        yield put (actions.getItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let content = action.payload.content
        let arrNameImg = action.payload.arrNameImg
        yield callApi(types.HTTP_CREATE,'',{content,arrNameImg})
        yield put (actions.addItemSuccess())
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put (actions.getItemFailure(error))
    }
}
function* updateItemSaga(action) {
    try {
        let id = action.payload.id
        let content = action.payload.content
        let arrNameImg = action.payload.arrNameImg
        yield callApi(types.HTTP_UPDATE,id,{content,arrNameImg})
        yield put (actions.updateItemSuccess())
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put (actions.getItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put (actions.deleteItemSuccess())
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put (actions.getItemFailure(error))
    }
}
export const itemSaga = [
    takeEvery(types.GET_ITEM_REQUEST,getItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.UPDATE_ITEM_REQUEST,updateItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
]