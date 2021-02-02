import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import style from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {
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

    let newPostElement = React.createRef()

    let onAddPost = () => {
        props.addPost()
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChange}
                        ref={newPostElement}
                        value={props.newPostText}
                    />
                </div>
                <div>
                    <button onClick={onAddPost}>addpost</button>
                </div>
            </div>
            <div className={style.posts}>{post}</div>
        </div>
    )
}

export default MyPosts
