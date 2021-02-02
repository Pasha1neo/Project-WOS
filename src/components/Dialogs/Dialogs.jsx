import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {Field, reduxForm} from 'redux-form'
import {Textarea} from '../common/FormsControls/FormsControls'
import {maxLengthCreator, required} from '../utils/validators/validators'

const maxLength = maxLengthCreator(20)
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                placeholder='Введите сообщение'
                name={'newMessageBody'}
                component={Textarea}
                validate={[required, maxLength]}
            />
            <button>Отправить</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: 'DialogAddMessageFormRedux',
})(AddMessageForm)

const Dialogs = (props) => {
    let state = props.dialogsPage

    let dialogsElements = state.DialogData.map((d) => (
        <DialogItem name={d.name} key={d.id} id={d.id} />
    ))

    let messagesElements = state.MessageData.map((m) => <Message message={m.message} key={m.id} />)

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>{dialogsElements}</div>
            <div>
                <div className={style.messageBlock}>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs
