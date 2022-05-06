import * as types from '../constants'
import * as actions from '../actions/itemActions'
import { put, takeEvery } from 'redux-saga/effects'
import callApi from '../fetchAPIs/callAPI'
function* getItemSaga(action) {
    try {
        let token = yield localStorage.getItem('token')
        let res = yield callApi(types.HTTP_READ,'',token)
        if (res.errorMessage) {
            yield put (actions.getItemFailure(res.errorMessage))
            alert(res.errorMessage)
            window.location.href = '/'
        } else {
            yield put (actions.getItemSuccess(res))
        }
    } catch (error) {
        yield put (actions.getItemFailure(error))
    }
}
function* addItemSaga(action) {
    try {
        let name = action.payload.name
        let token = yield localStorage.getItem('token')
        let res = yield callApi(types.HTTP_CREATE,'',{name,token})
        if (res.errorMessage) {
            yield put (actions.addItemFailure(res.errorMessage))
            alert(res.errorMessage)
        } else {
            yield put (actions.addItemSuccess())
        }
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put (actions.addItemFailure(error))
    }
}
function* updateItemSaga(action) {
    try {
        let name = action.payload.name
        let id = action.payload.id
        let token = yield localStorage.getItem('token')
        let res = yield callApi(types.HTTP_UPDATE,id,{name,token})
        if (res.errorMessage) {
            yield put (actions.updateItemFailure(res.errorMessage))
            alert(res.errorMessage)
        } else {
            yield put (actions.updateItemSuccess())
        }
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put (actions.updateItemFailure(error))
    }
}
function* deleteItemSaga(action) {
    try {
        let id = action.payload.id
        let token = yield localStorage.getItem('token')
        let res = yield callApi(types.HTTP_DELETE,id,token)
        if (res.errorMessage) {
            yield put (actions.deleteItemFailure(res.errorMessage))
            alert(res.errorMessage)
        } else {
            yield put (actions.deleteItemSuccess())
        }
        yield put (actions.getItemRequest())
    } catch (error) {
        yield put (actions.deleteItemFailure(error))
    }
}
function* registerUserSaga(action) {
    try {
        let {userName,passWord,email} = action.payload
        let res = yield callApi(types.HTTP_CREATE,'register',{userName,passWord,email})
        if (res.errorMessage) {
            yield put (actions.registerUserFailure(res.errorMessage))
            alert(res.errorMessage)
        } else {
            yield localStorage.setItem('token',res.token)
            yield localStorage.setItem('role',res.getUser.role)
            yield put (actions.registerUserSuccess())
            window.location.href = '/items'
        }
    } catch (error) {
        yield put (actions.registerUserFailure(error))
    }
}
function* loginUserSaga(action) {
    try {
        let {userName,passWord,email} = action.payload
        let res = yield callApi(types.HTTP_CREATE,'login',{userName,passWord,email})
        if (res.errorMessage) {
            yield put (actions.loginUserFailure(res.errorMessage))
            alert(res.errorMessage)
        } else {
            yield localStorage.setItem('token',res.token)
            yield localStorage.setItem('role',res.getUser.role)
            yield put (actions.loginUserSuccess())
            window.location.href = '/items'
        }
    } catch (error) {
        yield put (actions.loginUserFailure(error))
    }
}
function* getUserSaga() {
    try {
        let token = yield localStorage.getItem('token')
        let res = yield callApi(types.HTTP_READ,'user',token)
        if (res.errorMessage) {
            yield put (actions.getUserFailure(res.errorMessage))
            alert(res.errorMessage)
            window.location.href = '/items'
        } else {
            yield put (actions.getUserSuccess(res))
        }
    } catch (error) {
        yield put (actions.getUserFailure(error))
    }
}

function* updateUserSaga(action) {
    try {
        let role = action.payload.role
        let id = action.payload.id
        let token = yield localStorage.getItem('token')
        let res = yield callApi(types.HTTP_UPDATE,`user/${id}`,{role,token})
        if (res.errorMessage) {
            yield put (actions.updateUserFailure(res.errorMessage))
            alert(res.errorMessage)
        } else {
            yield put (actions.updateUserSuccess())
        }
        yield put (actions.getUserRequest())
    } catch (error) {
        yield put (actions.updateUserFailure(error))
    }
}
export const itemSaga = [
    takeEvery(types.GET_ITEM_REQUEST,getItemSaga),
    takeEvery(types.ADD_ITEM_REQUEST,addItemSaga),
    takeEvery(types.UPDATE_ITEM_REQUEST,updateItemSaga),
    takeEvery(types.DELETE_ITEM_REQUEST,deleteItemSaga),
    takeEvery(types.REGISTER_USER_REQUEST,registerUserSaga),
    takeEvery(types.LOGIN_USER_REQUEST,loginUserSaga),
    takeEvery(types.GET_USER_REQUEST,getUserSaga),
    takeEvery(types.UPDATE_USER_REQUEST,updateUserSaga),
]