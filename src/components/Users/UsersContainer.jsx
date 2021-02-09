import React from 'react'
import Users from './Users'
import {connect} from 'react-redux'
import Preloader from '../common/Preloader/Preloader'
import {follow, unfollow, toggleFollowingProgress, requestUsers} from '../../redux/usersReducer'
import {compose} from 'redux'
import {
    getUsers,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress,
} from '../../redux/usersSelectors'

class UserscContainer extends React.Component {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }
    onPageChanged = (currentPage) => {
        let {pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }
    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}
export default compose(
    connect(mapStateToProps, {follow, unfollow, toggleFollowingProgress, requestUsers})
)(UserscContainer)
