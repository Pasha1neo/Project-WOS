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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SENDMESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                MessageData: [...state.MessageData, {id: 6, message: body}],
            }

        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SENDMESSAGE, newMessageBody})

export default dialogsReducer
