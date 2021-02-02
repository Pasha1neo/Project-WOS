import {stopSubmit} from 'redux-form'
import {authAPI} from '../api/api'

const SETUSERDATA = 'SETUSERDATA'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUSERDATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SETUSERDATA,
    payload: {userId, email, login, isAuth},
})
export const auth = () => (dispatch) => {
    return authAPI.me().then((data) => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    })
}
export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(auth())
            } else {
                let message =
                    response.data.messages.length > 0
                        ? response.data.messages[0]
                        : 'Какая то ошибка'
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
    }
}
export const logout = () => {
    return (dispatch) => {
        authAPI.logout().then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
}
export default authReducer
