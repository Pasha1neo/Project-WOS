import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getProfile, getUserStatus, updateStatus, savePhoto} from '../../redux/profileReducer'
import {compose} from 'redux'

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.AuthorizedUserId
            if (!userId) {
                this.props.history.push('/login') //редирект по стандарту
            }
        }
        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }
    render() {
        return (
            <Profile
                savePhoto={this.props.savePhoto}
                isOwner={!this.props.match.params.userId}
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    AuthorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})
export default compose(
    connect(mapStateToProps, {getProfile, getUserStatus, updateStatus, savePhoto}),
    withRouter
)(ProfileContainer)
