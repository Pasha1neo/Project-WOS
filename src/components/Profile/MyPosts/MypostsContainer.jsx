import {addPostCreator, updateNewPostTextCreator} from '../../../redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = updateNewPostTextCreator(text)
            dispatch(action)
        },
        addPost: () => {
            dispatch(addPostCreator())
        },
    }
}
const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MypostsContainer
