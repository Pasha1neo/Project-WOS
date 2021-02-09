import Paginator from '../common/paginator/Paginator'
import User from './User'

const Users = ({
    currentPage,
    onPageChanged,
    totalUsersCount,
    pageSize,
    users,
    followingInProgress,
    unfollow,
    follow,
}) => {
    return (
        <div>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            />
            {users.map((user) => {
                return (
                    <User
                        key={user.id}
                        user={user}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        follow={follow}
                    />
                )
            })}
        </div>
    )
}

export default Users
