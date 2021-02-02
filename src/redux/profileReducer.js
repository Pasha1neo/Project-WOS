import {profileAPI} from '../api/api'

const ADDPOST = 'ADD-POST'
const SETUSERPROFILE = 'SETUSERPROFILE'
const SETSTATUS = 'SETSTATUS'

let initialState = {
    postData: [
        {text: 'Hi, how are you?', id: 1, likeCount: 1},
        {text: "It's my furst post", id: 2, likeCount: 10},
        {text: "It's my second post", id: 3, likeCount: 20},
    ],
    profile: null,
    status: '',
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
        case ADDPOST: {
            return {
                ...state,
                postData: [
                    ...state.postData,
                    {
                        text: action.newPostText,
                        id: state.postData.length + 1,
                        likeCount: 0,
                    },
                ],
            }
        }
        case SETUSERPROFILE: {
            return {
                ...state,
                profile: action.profile,
            }
        }
        case SETSTATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
    }
}

export const addPostCreator = (newPostText) => {
    return {type: ADDPOST, newPostText}
}

export const setUserProfile = (profile) => {
    return {type: SETUSERPROFILE, profile: profile}
}
export const setStatus = (status) => {
    return {type: SETSTATUS, status: status}
}

export const getProfile = (id) => {
    return (dispatch) => {
        profileAPI.getProfile(id).then((data) => {
            dispatch(setUserProfile(data))
        })
    }
}
export const getUserStatus = (id) => {
    return (dispatch) => {
        profileAPI.getStatus(id).then((data) => {
            dispatch(setStatus(data))
        })
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
}

export default profileReducer
