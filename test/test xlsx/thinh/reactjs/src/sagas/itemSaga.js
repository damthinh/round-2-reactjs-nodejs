import * as types from '../constants'
import * as actions from '../actions/itemActions'
import { put, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* paginationExcelSaga(action) {
    try {
        let activePage = action.payload.activePage
        let res = yield callApi(types.HTTP_READ,`?page=${activePage}&limit=${types.LIMIT}`)
        let listExcel = res.listExcel
        let listPage = res.listPage
        let totalPage = res.totalPage
        yield put (actions.paginationExcelSuccess({activePage,totalPage,listExcel,listPage}))
    } catch (error) {
        yield put (actions.paginationExcelFailure(error))
    }
}
function* uploadExcelSaga(action) {
    try {
        let form = action.payload.form
        yield callApi(types.HTTP_CREATE,'excel',form)
        yield put (actions.uploadExcelSuccess())
        yield put (actions.paginationExcelRequest({activePage:1}))
    } catch (error) {
        yield put (actions.uploadExcelFailure(error))
    }
}
function* addExcelSaga(action) {
    try {
        let form = action.payload.form
        yield callApi(types.HTTP_CREATE,'',form)
        yield put (actions.addExcelSuccess())
        yield put (actions.paginationExcelRequest({activePage:1}))
    } catch (error) {
        yield put (actions.addExcelFailure(error))
    }
}
function* updateExcelSaga(action) {
    try {
        let {form,id} = action.payload
        yield callApi(types.HTTP_UPDATE,id,form)
        yield put (actions.updateExcelSuccess())
        yield put (actions.paginationExcelRequest({activePage:1}))
    } catch (error) {
        yield put (actions.updateExcelFailure(error))
    }
}
function* deleteExcelSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put (actions.deleteExcelSuccess())
        yield put (actions.paginationExcelRequest({activePage:1}))
    } catch (error) {
        yield put (actions.deleteExcelFailure(error))
    }
}
export const itemSaga = [
    takeEvery(types.PAGINATION_EXCEL_REQUEST,paginationExcelSaga),
    takeEvery(types.UPLOAD_EXCEL_REQUEST,uploadExcelSaga),
    takeEvery(types.ADD_EXCEL_REQUEST,addExcelSaga),
    takeEvery(types.UPDATE_EXCEL_REQUEST,updateExcelSaga),
    takeEvery(types.DELETE_EXCEL_REQUEST,deleteExcelSaga),
]