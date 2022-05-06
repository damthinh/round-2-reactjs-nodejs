import * as types from '../constants'
import * as actions from '../actions/itemActions'
import { put, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* getItemSaga(action) {
    try {
        let token = localStorage.getItem('token')
        if (token) {
            let res = yield callApi(types.HTTP_READ, '', { token })
            yield put(actions.getItemSuccess(res.listItem))
        } else {
            window.location.href = "/";
            yield put(actions.getItemFailure())
        }

    } catch (error) {
        yield put(actions.getItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let token = localStorage.getItem('token')
        let name = action.payload.name
        const res = yield callApi(types.HTTP_CREATE, '', { name, token })
        if (res.status == 1) {
            yield put(actions.addItemFailure(res.message))
            yield put(actions.getItemRequest())
        } else {
            yield put(actions.addItemSuccess())
        }
        yield put(actions.getItemRequest())
    } catch (error) {
        yield put(actions.addItemFailure(error))
    }
}
function* updateItemSaga(action) {
    try {
        let token = localStorage.getItem('token')
        let id = action.payload.id
        let name = action.payload.name
        const res = yield callApi(types.HTTP_UPDATE, id, { name, token })
        if (res.status == 1) {
            yield put(actions.updateItemFailure(res.message))
        } else {
            yield put(actions.updateItemSuccess())
        }
        yield put(actions.getItemRequest())
    } catch (error) {
        yield put(actions.updateItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let token = localStorage.getItem('token')
        let id = action.payload.id
        const res = yield callApi(types.HTTP_DELETE, id, { token })
        if (res.status == 1) {
            yield put(actions.deleteItemFailure(res.message))
        } else {
            yield put(actions.deleteItemSuccess())
        }
        yield put(actions.getItemRequest())
    } catch (error) {
        yield put(actions.deleteItemFailure(error))
    }
}

function* loginItemSaga(action) {
    try {
        let { userName, passWord } = action.payload
        let res = yield callApi(types.HTTP_CREATE, 'login', { userName, passWord })
        if (res.message) {
            yield put(actions.loginItemFailure(res.message))
        } else if (res.token) {
            console.log(res.token, 'token saga');
            localStorage.setItem('token', res.token)
            localStorage.setItem('role', res.dataUser.role)
            yield put(actions.loginItemSuccess({ userName}))
            window.location.href = "/items";
        }
    } catch (error) {
        yield put(actions.loginItemFailure(error))
    }
}
function* logoutItemSaga() {
    try {
        localStorage.setItem('token', '')
        localStorage.setItem('role', '')
        yield put(actions.logoutItemSuccess())
        window.location.href = "/";
    } catch (error) {
        yield put(actions.logoutItemFailure(error))
    }
}

function* registerItemSaga(action) {
    try {
        let { userName, passWord } = action.payload
        let res = yield callApi(types.HTTP_CREATE, 'register', { userName, passWord })
        if (res.message) {
            yield put(actions.registerItemFailure(res.message))
        } else if (res.token) {
            console.log(res.token, 'token saga');
            localStorage.setItem('token', res.token)
            yield put(actions.registerItemSuccess(userName))
            yield put(actions.getItemRequest())
            window.location.href = "/items";
        }
    } catch (error) {
        yield put(actions.registerItemFailure(error))
    }
}
export const itemSaga = [
    takeEvery(types.GET_ITEM_REQUEST, getItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST, addItemSaga),
    takeEvery(types.UPDATE_ITEM_REQUEST, updateItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST, deleteItemSaga),
    takeEvery(types.LOGIN_ITEM_REQUEST, loginItemSaga),
    takeEvery(types.LOGOUT_ITEM_REQUEST, logoutItemSaga),
    takeEvery(types.REGISTER_ITEM_REQUEST, registerItemSaga),
]