const UPDATEMESSAGETEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const SENDMESSAGE = 'SEND-MESSAGE'

let initialState = {
    DialogData: [
        {id: 1, name: 'Pasha'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Georgiy'},
        {id: 5, name: 'Valera'},
        {id: 6, name: 'Viktor'},
    ],
    MessageData: [
        {id: 1, message: 'First message'},
        {id: 2, message: 'Second message'},
        {id: 3, message: 'Third message'},
        {id: 4, message: 'Four message'},
        {id: 5, message: 'Five message'},
    ],
    newMessageText: '',
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATEMESSAGETEXT:
            return {
                ...state,
                newMessageText: action.newText,
            }
        case SENDMESSAGE:
            if (state.newMessageText.trim() !== '') {
                return {
                    ...state,
                    newMessageText: '',
                    MessageData: [
                        ...state.MessageData,
                        {
                            id: state.MessageData.length + 1,
                            message: state.newMessageText,
                        },
                    ],
                }
            }
            return state
        default:
            return state
    }
}

export default dialogsReducer
export const updateNewMessageTextCreator = (text) => {
    return {type: UPDATEMESSAGETEXT, newText: text}
}
export const sendMessageCreator = () => {
    return {type: SENDMESSAGE}
}
