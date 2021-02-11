import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import photo from '../MyPosts/Post/photo.svg'
import ProfileStatusWithHooks from './ProfileStatuswithhooks'

const ProfileInfo = ({profile, userId, status, updateStatus, ...props}) => {
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            <div>
                <img
                    className={s.mainPhoto}
                    src={profile.photos.small ? profile.photos.small : photo}
                    alt={userId}
                />
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
                <div className={s.fullName}>{profile.fullName}</div>
                <div>{profile.aboutMe}</div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo
