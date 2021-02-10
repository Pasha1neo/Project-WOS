import {usersAPI} from '../api/api'
import {updateObjectInArray} from '../components/utils/objectsHelpers'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SETUSERS = 'SETUSERS'
const SETCURRENTPAGE = 'SETCURRENTPAGE'
const SETTOTALCOUNT = 'SETTOTALCOUNT'
const TOGGLEISFETCHING = 'TOGGLEISFETCHING'
const FOLLOWINGPROGRESS = 'TOGGLEISFOLLOWINGPROGRESS'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: true,
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: false,
                }),
            }
        case SETUSERS:
            return {...state, users: action.users}
        case SETCURRENTPAGE:
            return {...state, currentPage: action.currentPage}
        case SETTOTALCOUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLEISFETCHING:
            return {...state, isFetching: action.isFetching}
        case FOLLOWINGPROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter((id) => id !== action.userId)],
            }
        default:
            return state
    }
}

export default usersReducer
export const followUser = (userId) => ({type: FOLLOW, userId})
export const unfollowUser = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SETUSERS, users})
export const setCurrentPage = (currentPage) => ({
    type: SETCURRENTPAGE,
    currentPage,
})
export const setTotalUsersCount = (totalCount) => ({
    type: SETTOTALCOUNT,
    totalCount,
})
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLEISFETCHING,
    isFetching,
})
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: FOLLOWINGPROGRESS,
    isFetching,
    userId,
})

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(setUsers(data.items))
    dispatch(toggleIsFetching(false))
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followUser)
}
export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), unfollowUser)
}
