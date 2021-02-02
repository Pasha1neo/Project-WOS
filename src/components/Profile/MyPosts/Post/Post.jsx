import styles from './Post.module.css'
import photo from './photo.svg'

const Post = (props) => {
    return (
        <div className={styles.item}>
            <img src={props.photos.small ? props.photos.small : photo} alt={props.id} />
            <div>{props.text}</div>
            <div>Likes {props.likeCount}</div>
            <div>Id {props.id}</div>
        </div>
    )
}
export default Post
