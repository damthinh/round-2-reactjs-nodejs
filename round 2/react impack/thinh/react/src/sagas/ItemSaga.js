import * as types from "../constants" 
import * as actions from "../actions/index"
import { put, select, takeEvery } from "redux-saga/effects"
import callApi from "../fetchAPIs/callAPI"
function* pagiItemSaga(action) {
    try {
        let activePage = action.payload.activePage
        let textSearch = yield select((store)=>store.items.textSearch)
        let res = yield callApi(types.HTTP_READ,`?page=${activePage}&q=${textSearch}&limit=${types.LIMIT}`)
        let listItem = res.listItem
        let totalPage = res.totalPage
        if(totalPage===0)totalPage=1
        yield put (actions.pagiItemSuccess({activePage,totalPage,listItem}))
    } catch (error) {
        yield put (actions.pagiItemFailure({errorMessage: error}))
    }
}

function* addItemSaga(action) {
    try {
        let name = action.payload.name
        let res = yield callApi(types.HTTP_CREATE,`?limit=${types.LIMIT}`,name)
        let totalPage = res.totalPage
        yield put (actions.addItemSuccess({textSearch:''}))
        
        yield put (actions.pagiItemRequest({activePage:totalPage}))
    } catch (error) {
        yield put (actions.addItemFailure({errorMessage: error}))
    }
}
function* putItemSaga(action) {
    try {
        let name = action.payload.name
        let id = action.payload.id
        yield callApi (types.HTTP_UPDATE,id,name)
        yield put (actions.putItemSuccess())
        let activePage = yield select((store)=>store.items.activePage)
        yield put (actions.pagiItemRequest({activePage:activePage}))
    } catch (error) {
        yield put (actions.putItemFailure({errorMessage: error}))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put (actions.deleteItemSuccess())
        let activePage = yield select((store)=>store.items.activePage)
        let listItem = yield select((store)=>store.items.listItem)
        let length = listItem.length
        if (length===1) {
            if (activePage===1) {
                yield put (actions.pagiItemRequest({activePage:activePage}))
            } else {
                yield put (actions.pagiItemRequest({activePage:activePage-1}))
            }
        } else {
            yield put (actions.pagiItemRequest({activePage:activePage}))
        }
    } catch (error) {
        yield put (actions.deleteItemFailure({errorMessage: error}))
    }
}
function* searchItemSaga(action) {
    try {
        let textSearch = action.payload.textSearch
        
        yield put (actions.searchItemSuccess({textSearch:textSearch}))
        yield put (actions.pagiItemRequest({activePage:1}))
    } catch (error) {
        yield put (actions.searchItemFailure({errorMessage: error}))
    }
}

export const ItemSaga =[
    takeEvery(types.PAGI_ITEM_REQUEST,pagiItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.PUT_ITEM_REQUEST,putItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
    takeEvery(types.SEARCH_ITEM_REQUEST,searchItemSaga),
]