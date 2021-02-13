import {stopSubmit} from 'redux-form'
import {authAPI, securityAPI} from '../api/api'

const SETUSERDATA = 'auth/SETUSERDATA'
const GETCAPTCHAURL = 'GETCAPTCHAURL'
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUSERDATA:
        case GETCAPTCHAURL:
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
export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GETCAPTCHAURL,
    payload: {captchaUrl},
})
export const auth = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(auth())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message =
            response.data.messages.length > 0 ? response.data.messages[0] : 'Какая то ошибка'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer

export const getCaptchaUrl = (email, password, rememberMe) => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
