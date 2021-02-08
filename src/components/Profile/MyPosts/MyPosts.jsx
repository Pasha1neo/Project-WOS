import style from './MyPosts.module.css'
import Post from './Post/Post'
import Preloader from '../../common/Preloader/Preloader'
import {Field, reduxForm} from 'redux-form'
import {required, maxLengthCreator} from '../../utils/validators/validators'
import {Textarea} from '../../common/FormsControls/FormsControls'
import React from 'react'

const maxLength = maxLengthCreator(10)

const addNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                name={'newPostText'}
                component={Textarea}
                placeholder='Напишите что нибудь'
                validate={[required, maxLength]}
            />
            <button>Опубликовать пост</button>
        </form>
    )
}

const PostReduxFrom = reduxForm({form: 'ProfileAddNewPostForm'})(addNewPostForm)

const MyPosts = React.memo((props) => {
    if (!props.profile) {
        return <Preloader />
    }
    let post = props.postData.map((item) => {
        return (
            <Post
                text={item.text}
                likeCount={item.likeCount}
                id={item.id}
                key={item.id}
                photos={props.profile.photos}
            />
        )
    })

    let onAddPost = (value) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <PostReduxFrom onSubmit={onAddPost} />
            <div className={style.posts}>{post}</div>
        </div>
    )
})

export default MyPosts
