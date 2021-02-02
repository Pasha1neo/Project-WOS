import style from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MypostsContainer from './MyPosts/MypostsContainer'

const Profile = (props) => {
    return (
        <div className={style.backfone}>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MypostsContainer />
        </div>
    )
}

export default Profile
