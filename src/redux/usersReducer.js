import {usersAPI} from '../api/api'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SETUSERS = 'SETUSERS'
const SETCURRENTPAGE = 'SETCURRENTPAGE'
const SETTOTALCOUNT = 'SETTOTALCOUNT'
const TOGGLEISFETCHING = 'TOGGLEISFETCHING'
const FOLLOWINGPROGRESS = 'TOGGLEISFOLLOWINGPROGRESS'
let initialState = {
    users: [],
    pageSize: 100,
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
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
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
export const setCurrentPage = (currentPage) => ({type: SETCURRENTPAGE, currentPage})
export const setTotalUsersCount = (totalCount) => ({type: SETTOTALCOUNT, totalCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLEISFETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: FOLLOWINGPROGRESS,
    isFetching,
    userId,
})
export const requestUsers = (page, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        usersAPI.getUsers(page, pageSize).then((data) => {
            dispatch(setTotalUsersCount(data.totalCount))
            dispatch(setUsers(data.items))
            dispatch(toggleIsFetching(false))
        })
    }
}
export const follow = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        usersAPI.follow(id).then((res) => {
            if (res) {
                dispatch(followUser(id))
            }
            dispatch(toggleFollowingProgress(false, id))
        })
    }
}
export const unfollow = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        usersAPI.unFollow(id).then((res) => {
            if (res) {
                dispatch(unfollowUser(id))
            }
            dispatch(toggleFollowingProgress(false, id))
        })
    }
}
