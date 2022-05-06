import * as types from '../constants'
import * as actions from '../actions/itemActions'
import { put, select, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
// import callApiSearch from '../fetchAPIs/callApiSearch'
function* searchItemSaga(action) {
    try {
        let textSearch = action.payload.textSearch
        // let arrImg = action.payload.arrImg
        let res = yield callApi(types.HTTP_READ,`?q=${textSearch}`)
        let listItem = res
        yield put (actions.searchItemSuccess({textSearch,listItem}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let form = action.payload.form
        let res =yield callApi(types.HTTP_CREATE,'',form)
        console.log("rssssssssss",res);
        let textSearch = yield select ((store)=>store.items.textSearch)
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
function* putItemSaga(action) {
    try {
        let form = action.payload.form
        let id = action.payload.id
        console.log("id",id);
        yield callApi(types.HTTP_UPDATE,id,form)
        let textSearch = yield select ((store)=>store.items.textSearch)
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        let textSearch = yield select ((store)=>store.items.textSearch)
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}
function* deleteOmeImgItemSaga(action) {
    try {
        let id = action.payload.id
        let nameImg = action.payload.nameImg
        yield callApi(types.HTTP_DELETE,`img/${id}?img=${nameImg}`)
        let textSearch = yield select ((store)=>store.items.textSearch)
        yield put (actions.searchItemRequest({textSearch:textSearch}))
    } catch (error) {
        yield put (actions.searchItemFailure(error))
    }
}

export const itemSaga = [
    takeEvery(types.SEARCH_ITEM_REQUEST,searchItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.PUT_ITEM_REQUEST,putItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
    takeEvery(types.DELETEONEIMG_ITEM_REQUEST,deleteOmeImgItemSaga),
]
