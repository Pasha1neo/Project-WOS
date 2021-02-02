import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getProfile, getUserStatus, updateStatus} from '../../redux/profileReducer'
import {withAuthRedurect} from '../hoc/withAuthRedirect'
import {compose} from 'redux'

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 14319
        }
        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }
    render() {
        return (
            <Profile
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
})
export default compose(
    connect(mapStateToProps, {getProfile, getUserStatus, updateStatus}),
    withRouter
    // withAuthRedurect
)(ProfileContainer)
