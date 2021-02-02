import Dialogs from './Dialogs'
import {sendMessageCreator, updateNewMessageTextCreator} from '../../redux/dialogsReducer'
import {connect} from 'react-redux'
import {withAuthRedurect} from '../hoc/withAuthRedirect'
import {compose} from 'redux'

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        udpateNewMessageBody: (body) => {
            dispatch(updateNewMessageTextCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps) /**withAuthRedurect**/)(Dialogs)
