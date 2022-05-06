import { put, select, takeEvery } from "redux-saga/effects";
import * as types from '../constants'
import * as actions from '../actions/itemActions'
import callApi from "../fetchAPIs/callAPI";
function* searchItemSaga(action) {
    try {
        let textSearch = action.payload.textSearch
        let res = yield callApi(types.HTTP_READ,`?q=${textSearch}`)
        let listItem = res
        yield put (actions.searchItemSuccess({textSearch,listItem}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let content = action.payload.content
        let arrNameImg = action.payload.arrNameImg
        yield callApi(types.HTTP_CREATE,'',{content,arrNameImg})
        yield put (actions.addItemSuccess())
        let textSearch = yield select((store)=>store.items.textSearch)
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.addItemFailure(error))
    }
}
function* putItemSaga(action) {
    try {
        let content = action.payload.content
        let arrNameImg = action.payload.arrNameImg
        let id = action.payload.id
        yield callApi(types.HTTP_UPDATE,id,{content,arrNameImg})
        yield put (actions.putItemSuccess())
        let textSearch = yield select((store)=>store.items.textSearch)
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.putItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put (actions.deleteItemSuccess())
        let textSearch = yield select((store)=>store.items.textSearch)
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.deleteItemFailure(error))
    }
}
export const itemSaga = [
    takeEvery(types.SEARCH_ITEM_REQUEST,searchItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.PUT_ITEM_REQUEST,putItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
] 