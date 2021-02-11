import {profileAPI} from '../api/api'
const ADDPOST = 'profile/ADD-POST'
const SETUSERPROFILE = 'profile/SETUSERPROFILE'
const SETSTATUS = 'profile/SETSTATUS'
const DELETEPOST = 'profile/DELETEPOST'
const SAVEPHOTOSUCCESS = 'SAVEPHOTOSUCCESS'

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
        case DELETEPOST: {
            return {
                ...state,
                postData: state.postData.filter((p) => p.id !== action.postId),
            }
        }
        case SAVEPHOTOSUCCESS: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos,
                },
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
export const deletePost = (postId) => {
    return {type: DELETEPOST, postId}
}
export const savePhotoSuccess = (photos) => {
    return {type: SAVEPHOTOSUCCESS, photos}
}

export const getProfile = (id) => async (dispatch) => {
    let data = await profileAPI.getProfile(id)
    dispatch(setUserProfile(data))
}
export const getUserStatus = (id) => async (dispatch) => {
    let data = await profileAPI.getStatus(id)
    dispatch(setStatus(data))
}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export default profileReducer
