import * as types from '../constants'
import * as actions from '../actions/itemActions'
import { put, select, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* searchItemSaga(action) {
    try {
        let textSearch = action.payload.textSearch
        console.log("text",textSearch);
        let res = yield callApi(types.HTTP_READ,`?q=${textSearch}`)
        let listItem = res
        yield put ( actions.searchItemSuccess({textSearch,listItem}))
    } catch (error) {
        yield put ( actions.searchItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let form = action.payload.form
        yield callApi(types.HTTP_CREATE,'',form)
        yield put (actions.addItemSuccess())
        let textSearch = yield select ((store)=>store.items.textSearch)
        yield put ( actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put ( actions.addItemFailure(error))
    }
}
function* updateItemSaga(action) {
    try {
        let id = action.payload.id
        let form = action.payload.form
        yield callApi(types.HTTP_UPDATE,id,form)
        yield put (actions.updateItemSuccess())
        let textSearch = yield select ((store)=>store.items.textSearch)
        yield put ( actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put ( actions.updateItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put (actions.deleteItemRequest())
        let textSearch = yield select ((store)=>store.items.textSearch)
        yield put ( actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put ( actions.deleteItemFailure(error))
    }
}
function* deleteOneImgItemSaga(action) {
    try {
        let id = action.payload.id
        let index = action.payload.index
        yield callApi(types.HTTP_DELETE,`img/${id}?index=${index}`)
        yield put (actions.deleteOneImgItemSuccess())
        let textSearch = yield select ((store)=>store.items.textSearch)
        yield put ( actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put ( actions.deleteOneImgItemFailure(error))
    }
}
export const itemSaga =[
    takeEvery(types.SEARCH_ITEM_REQUEST,searchItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.UPDATE_ITEM_REQUEST,updateItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
    takeEvery(types.DELETEONEIMG_ITEM_REQUEST,deleteOneImgItemSaga),
] 