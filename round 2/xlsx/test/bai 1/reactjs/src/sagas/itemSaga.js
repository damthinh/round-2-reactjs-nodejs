import * as types from '../constants'
import * as actions from '../actions/itemActions'
import { put, select, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* paginationExcelSaga(action) {
    try {
        let activePage = action.payload.activePage
        let res = yield callApi(types.HTTP_READ,`?page=${activePage}&limit=${types.LIMIT}`)
        console.log("rsss",res);
        let listPage = res.listPage
        let listExcel = res.listExcel
        let totalPage = res.totalPage
        yield put(actions.paginatinonExcelSuccess({activePage,totalPage,listPage,listExcel}))
    } catch (error) {
        yield put (actions.paginatinonExcelFailure(error))
    }
}
function* uploadExcelSaga(action) {
    try {
        let form = action.payload.form
        console.log('form',form);
        let res = yield callApi(types.HTTP_CREATE,'excel',form)
        console.log("rsss",res);
        yield put(actions.uploadExcelSuccess())
        yield put (actions.paginatinonExcelRequest({activePage:1}))
    } catch (error) {
        yield put (actions.uploadExcelFailure(error))
    }
}
function* addExcelSaga(action) {
    try {
        let form = action.payload.form
        let res = yield callApi(types.HTTP_CREATE,`?limit=${types.LIMIT}`,form)
        let totalPage = res.totalPage
        yield put(actions.addExcelSuccess())
        yield put (actions.paginatinonExcelRequest({activePage:totalPage}))
    } catch (error) {
        yield put (actions.addExcelFailure(error))
    }
}
function* updateExcelSaga(action) {
    try {
        let id = action.payload.id
        let form = action.payload.form
        yield callApi(types.HTTP_UPDATE,id,form)
        yield put(actions.updateExcelSuccess())
        let activePage = yield select((store)=>store.excels.activePage)
        yield put (actions.paginatinonExcelRequest({activePage:activePage}))
    } catch (error) {
        yield put (actions.updateExcelFailure(error))
    }
}
function* deleteExcelSaga(action) {
    try {
        let id = action.payload.id
        yield callApi(types.HTTP_DELETE,id)
        yield put(actions.deleteExcelSuccess())
        let activePage = yield select((store)=>store.excels.activePage)
        let listPage = yield select((store)=>store.excels.listPage)
        if (listPage.length===1) {
            if (activePage===1) {
                yield put (actions.paginatinonExcelRequest({activePage:activePage}))
            } else {
                yield put (actions.paginatinonExcelRequest({activePage:activePage-1}))
            }
        } else {
            yield put (actions.paginatinonExcelRequest({activePage:activePage}))
        }
        
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