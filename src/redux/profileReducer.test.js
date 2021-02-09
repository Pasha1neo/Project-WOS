import profileReducer, {addPostCreator, deletePost} from './profileReducer'
let action = addPostCreator('it-kamasutra.com')
let state = {
    postData: [
        {text: 'Hi, how are you?', id: 1, likeCount: 1},
        {text: "It's my furst post", id: 2, likeCount: 10},
        {text: "It's my second post", id: 3, likeCount: 20},
    ],
}
test('Длинна массива равна 4', () => {
    let newState = profileReducer(state, action)
    expect(newState.postData.length).toBe(4)
})
test('обьект под номером 3 должен содержать "it-kamasutra.com"', () => {
    let newState = profileReducer(state, action)
    expect(newState.postData[3].text).toBe('it-kamasutra.com')
})
test('пост под номером 1 должен быть удалён', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.postData.length).toBe(2)
})
test('должно быть 3 поста ', () => {
    let action = deletePost(1000)
    let newState = profileReducer(state, action)
    expect(newState.postData.length).toBe(3)
})
