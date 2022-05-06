import * as types from '../constants'
import * as actions from '../actions/index'
import { put, select, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* paginationItemSaga(action) {
    try {
        let activePage = action.payload.activePage
        let textSearch = yield select((store) => store.items.textSearch)
        let res = yield callApi(types.HTTP_READ, `?page=${activePage}&q=${textSearch}&limit=${types.LIMIT}`)
        let listItem = res.listItem
        let totalPage = res.totalPage
        console.log("res",res);
        yield put(actions.paginationItemSuccess({ activePage, totalPage, listItem,id:'' }))
    } catch (error) {
        yield put(actions.paginationItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let name = action.payload.name
        let textSearch = yield select((store) => store.items.textSearch)
        let res = yield callApi(types.HTTP_CREATE, `?q=${textSearch}&limit=${types.LIMIT}`,name)
        let listItem = res.listItem
        let totalPage = res.totalPage
        if (name.toLowerCase().includes(textSearch.toLowerCase())===true) {
            yield put(actions.addItemSuccess({}))
            yield put(actions.paginationItemRequest({ activePage: totalPage }))
        } else {
            yield put(actions.addItemSuccess({ activePage: 1, totalPage: 1, listItem }))
        }
    } catch (error) {
        yield put(actions.addItemFailure(error))
    }
}
function* putItemSaga(action) {
    try {
        let name = action.payload.name
        let id = action.payload.id
        let res = yield callApi(types.HTTP_UPDATE, id, name)
        let listItem = res.listItem
        let activePage = yield select((store) => store.items.activePage)
        let textSearch = yield select((store) => store.items.textSearch)
        let id2 = yield select((store) => store.items.id)
        if (name.toLowerCase().includes(textSearch.toLowerCase())) {
            if (id === id2) {
                yield put(actions.putItemSuccess({activePage: 1, totalPage: 1, listItem,id:id}))
            } else {
                yield put(actions.putItemSuccess({}))
                yield put(actions.paginationItemRequest({ activePage: activePage }))
            }
        } else {
            yield put(actions.putItemSuccess({ activePage: 1, totalPage: 1, listItem, id: id }))
        }

    } catch (error) {
        yield put(actions.putItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE, id)
        let activePage = yield select((store) => store.items.activePage)
        let listItem = yield select((store) => store.items.listItem)
        if (listItem.length === 1) {
            if (activePage === 1) {
                yield put(actions.deleteItemSuccess({ activePage: 1, totalPage: 1, listItem: [] }))
            } else {
                yield put(actions.deleteItemSuccess({}))
                yield put(actions.paginationItemRequest({ activePage: activePage - 1 }))
            }
        } else {
            yield put(actions.paginationItemRequest({ activePage: activePage }))
        }
    } catch (error) {
        yield put(actions.paginationItemFailure(error))
    }
}
function* searchItemSaga(action) {
    try {
        let textSearch = action.payload.textSearch
        yield put(actions.searchItemSuccess({textSearch}))
        yield put(actions.paginationItemRequest({ activePage: 1 }))
    } catch (error) {
        yield put(actions.paginationItemFailure(error))
    }
}
export const itemSaga = [
    takeEvery(types.PAGINATION_ITEM_REQUEST, paginationItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST, addItemSaga),
    takeEvery(types.PUT_ITEM_REQUEST, putItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST, deleteItemSaga),
    takeEvery(types.SEARCH_ITEM_REQUEST, searchItemSaga),
]