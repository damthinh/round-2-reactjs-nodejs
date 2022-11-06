import { put, takeEvery } from 'redux-saga/effects'
import * as types from '../constants'
import * as actions from '../actions/itemActions'
import callApi from '../fetchAPIs/callAPI'
function* getItemSaga(action) {
    try {
        let listItem = yield callApi(types.HTTP_READ,'')
        yield put (actions.getItemSuccess({listItem})) 
    } catch (error) {
        yield put(actions.getItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let form = action.payload.form
        yield callApi(types.HTTP_CREATE,'',form)
        yield put (actions.addItemSuccess())
        yield put (actions.getItemRequest()) 
    } catch (error) {
        yield put(actions.addItemFailure(error))
    }
}
function* updateItemSaga(action) {
    try {
        let form = action.payload.form
        let id = action.payload.id
        yield callApi(types.HTTP_UPDATE,id,form)
        yield put (actions.updateItemSuccess())
        yield put (actions.getItemRequest()) 
    } catch (error) {
        yield put(actions.updateItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put (actions.deleteItemSuccess()) 
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put(actions.deleteItemFailure(error))
    }
}
function* deleteOneImgItemSaga(action) {
    try {
        let id = action.payload.id
        let index = action.payload.index
        yield callApi(types.HTTP_DELETE,`img/${id}?index=${index}`)
        yield put (actions.deleteOneImgItemSuccess())
        yield put (actions.getItemRequest()) 
    } catch (error) {
        yield put(actions.deleteOneImgItemFailure(error))
    }
}
export const itemSaga =[
    takeEvery(types.GET_ITEM_REQUEST,getItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.UPDATE_ITEM_REQUEST,updateItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
    takeEvery(types.DELETEONEIMG_ITEM_REQUEST,deleteOneImgItemSaga),
]