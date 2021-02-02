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
                ...action.data,
                isAuth: true,
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login) => ({
    type: SETUSERDATA,
    data: {userId, email, login},
})

export default authReducer

export const auth = () => {
    return (dispatch) => {
        authAPI.me().then((data) => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
    }
}
