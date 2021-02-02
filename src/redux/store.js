let store = {
    _state: {
        profilePage: {
            postData: [
                {text: 'Hi, how are you?', id: 1, likeCount: 1},
                {text: "It's my furst post", id: 2, likeCount: 10},
                {text: "It's my second post", id: 3, likeCount: 20},
            ],
            newPostText: '',
        },
        dialogsPage: {
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
                {id: 5, message: 'Six message'},
            ],
            newMessageText: '',
        },
        sidebar: {},
    },
    _callSubscriber() {
        console.log('observer is not defined')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        profileReducer(this._state.profilePage, action)
        dialogsReducer(this._state.dialogsPage, action)
        sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)
    },
}
