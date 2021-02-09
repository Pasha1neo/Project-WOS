import s from './User.module.css'
import {NavLink} from 'react-router-dom'
import photo from '../Profile/MyPosts/Post/photo.svg'

const User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <>
            <NavLink to={`/profile/${user.id}`}>
                <img
                    src={user.photos.small ? user.photos.small : photo}
                    alt={'Аватарка'}
                    className={s.usersPhoto}
                />
            </NavLink>
            {user.followed ? (
                <button
                    disabled={followingInProgress.some((id) => id === user.id)}
                    onClick={() => unfollow(user.id)}>
                    Отписаться
                </button>
            ) : (
                <button
                    disabled={followingInProgress.some((id) => id === user.id)}
                    onClick={() => follow(user.id)}>
                    Подписаться
                </button>
            )}
            <div>{user.name}</div>
            <div>{user.status}</div>
        </>
    )
}

export default User
