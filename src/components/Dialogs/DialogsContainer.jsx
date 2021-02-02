import Dialogs from './Dialogs'
import {sendMessageCreator} from '../../redux/dialogsReducer'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withAuthRedurect} from '../hoc/withAuthRedirect'

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody))
        },
    }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedurect)(Dialogs)
