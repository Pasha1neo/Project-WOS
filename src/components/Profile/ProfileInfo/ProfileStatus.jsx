import s from './ProfileInfo.module.css'
import React from 'react'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
    }
    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatus(this.state.status)
    }
    statusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            })
        }
    }
    render() {
        return (
            <div>
                {!this.state.editMode ? (
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status || '-------'}
                            {/* {this.props.status ? this.props.status : 'Статус отсутсвует'} */}
                        </span>
                    </div>
                ) : (
                    <div>
                        <input
                            autoFocus={true}
                            onBlur={this.deActivateEditMode}
                            value={this.state.status}
                            onChange={this.statusChange}
                        />
                    </div>
                )}
            </div>
        )
    }
}
export default ProfileStatus
