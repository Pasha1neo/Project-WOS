import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {
    let state = props.dialogsPage
    let dialogsElements = state.DialogData.map((d) => (
        <DialogItem name={d.name} key={d.id} id={d.id} />
    ))
    let messagesElements = state.MessageData.map((m) => <Message message={m.message} key={m.id} />)
    let newMessageText = state.newMessageText
    let onSendMessage = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (event) => {
        let body = event.target.value
        props.udpateNewMessageBody(body)
    }
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>{dialogsElements}</div>
            <div className={style.messageBlock}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea
                            onChange={onNewMessageChange}
                            value={newMessageText}
                            placeholder='Напишите сообщение'
                        />
                    </div>
                    <div>
                        <button onClick={onSendMessage}>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dialogs
