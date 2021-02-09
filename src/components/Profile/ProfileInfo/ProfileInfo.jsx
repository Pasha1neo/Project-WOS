import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import photo from '../MyPosts/Post/photo.svg'
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatuswithhooks'

const ProfileInfo = ({profile, userId, status, updateStatus}) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img
                    className={s.imagess}
                    src={profile.photos.small ? profile.photos.small : photo}
                    alt={userId}
                />
                <div className={s.fullName}>{profile.fullName}</div>
                <div>{profile.aboutMe}</div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo
