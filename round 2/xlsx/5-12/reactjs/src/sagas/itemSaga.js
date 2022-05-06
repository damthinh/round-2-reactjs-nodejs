import * as types from "../constants"
import * as actions from '../actions/itemActions'
import { put, takeEvery } from "redux-saga/effects"
import callApi from "../fetchAPIs/callAPI"
function* getItemSaga(action) {
    try {
        let res = yield callApi(types.HTTP_READ,'')
        let listItem = res.listItem
        yield put (actions.getExcelSuccess({listItem}))
    } catch (error) {
        yield put (actions.getExcelFailure(error))
    }
}
function* uploadItemSaga(action) {
    try {
        let form = action.payload.form
        yield callApi(types.HTTP_CREATE,'excel',form)
        yield put(actions.uploadExcelSuccess())
        yield put (actions.getExcelRequet())
    } catch (error) {
        yield put (actions.getExcelFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let form = action.payload.form
        yield callApi(types.HTTP_CREATE,'',form)
        yield put(actions.addExcelSuccess())
        yield put (actions.getExcelRequet())
    } catch (error) {
        yield put (actions.addExcelFailure(error))
    }
}
function* updateItemSaga(action) {
    try {
        let form = action.payload.form
        let id = action.payload.id
        yield callApi(types.HTTP_UPDATE,id,form)
        yield put(actions.updateExcelSuccess())
        yield put (actions.getExcelRequet())
    } catch (error) {
        yield put (actions.updateExcelFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put(actions.deleteExcelSuccess())
        yield put (actions.getExcelRequet())
    } catch (error) {
        yield put (actions.deleteExcelFailure(error))
    }
}
export const itemSaga =[
    takeEvery(types.GET_EXCEL_REQUEST,getItemSaga),
    takeEvery(types.UPLOAD_EXCEL_REQUEST,uploadItemSaga),
    takeEvery(types.ADD_EXCEL_REQUEST,addItemSaga),
    takeEvery(types.UPDATE_EXCEL_REQUEST,updateItemSaga),
    takeEvery(types.DELETE_EXCEL_REQUEST,deleteItemSaga),
]