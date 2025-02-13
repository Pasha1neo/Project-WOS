import s from './Users.module.css'
import {NavLink} from 'react-router-dom'
import photo from '../Profile/MyPosts/Post/photo.svg'

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div className={s.backfone}>
            <div className={s.allPages}>
                {pages.map((p) => {
                    return (
                        <span
                            className={props.currentPage === p && s.selectedPage}
                            onClick={() => {
                                props.onPageChanged(p)
                            }}>
                            {p}
                        </span>
                    )
                })}
            </div>
            {props.users.map((u) => {
                return (
                    <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={`/profile/${u.id}`}>
                                    <img
                                        src={u.photos.small ? u.photos.small : photo}
                                        alt={'Аватарка'}
                                        className={s.usersPhoto}
                                    />
                                </NavLink>
                            </div>
                            <div>
                                {u.followed ? (
                                    <button
                                        disabled={props.followingInProgress.some(
                                            (id) => id === u.id
                                        )}
                                        onClick={() => props.unfollow(u.id)}>
                                        Отписаться
                                    </button>
                                ) : (
                                    <button
                                        disabled={props.followingInProgress.some(
                                            (id) => id === u.id
                                        )}
                                        onClick={() => props.follow(u.id)}>
                                        Подписаться
                                    </button>
                                )}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{'u.location.county'}</div>
                                <div>{'u.location.city'}</div>
                            </span>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default Users
