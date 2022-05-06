import * as types from '../constants'
import * as actions from '../actions/index'
import { put, select, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* searchItemSaga(action) {
    try {
        let textSearch = action.payload.textSearch
        let res = yield callApi(types.HTTP_READ,`?q=${textSearch}`)
        let listItem = res
        console.log("res",res);
        yield put (actions.searchItemSuccess({textSearch,listItem}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let form = action.payload.form
        let textSearch = yield select((store)=>store.items.textSearch)
        yield callApi(types.HTTP_CREATE,'',form)
        yield put (actions.addItemSuccess())
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
function* putItemSaga(action) {
    try {
        let id = action.payload.id
        let form = action.payload.form
        let textSearch = yield select((store)=>store.items.textSearch)
        yield callApi(types.HTTP_UPDATE,id,form)
        yield put (actions.putItemSuccess())
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        let textSearch = yield select((store)=>store.items.textSearch)
        yield callApi(types.HTTP_DELETE,id)
        yield put (actions.deleteItemSuccess())
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
function* deleteOneImgItemSaga(action) {
    try {
        let id = action.payload.id
        let img = action.payload.img
        let textSearch = yield select((store)=>store.items.textSearch)
        yield callApi(types.HTTP_DELETE,`img/${id}?img=${img}`,)
        yield put (actions.deleteItemSuccess())
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
export const itemSaga =[
    takeEvery(types.SEARCH_ITEM_REQUEST,searchItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.PUT_ITEM_REQUEST,putItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
    takeEvery(types.DELETE_ONEIMG_ITEM_REQUEST,deleteOneImgItemSaga),
]