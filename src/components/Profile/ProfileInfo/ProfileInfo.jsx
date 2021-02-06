import style from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import photo from '../MyPosts/Post/photo.svg'
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatuswithhooks'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img
                    className={style.imagess}
                    src={
                        props.profile.photos.small
                            ? props.profile.photos.small
                            : photo
                    }
                    alt={props.userId}
                />
                <div className={style.fullName}>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <ProfileStatusWithHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>
        </div>
    )
}

export default ProfileInfo

/* <>
<img
className={style.imagess}
src='https://img11.postila.ru/data/5e/4f/36/61/5e4f3661d47029ebfbc7bb8471c6cf55e663819c8880a62575ca68a78021390e.jpg'
alt='картинка из интернета'
/>
</> */
