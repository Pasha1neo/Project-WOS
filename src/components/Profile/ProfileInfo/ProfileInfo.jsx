import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import photo from '../MyPosts/Post/photo.svg'
import ProfileStatusWithHooks from './ProfileStatuswithhooks'
import {useState} from 'react'
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = ({profile, userId, status, updateStatus, ...props}) => {
    const [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }
    return (
        <div>
            <div className={s.infoblock}>
                <img
                    className={s.mainPhoto}
                    src={profile.photos.small ? profile.photos.small : photo}
                    alt={userId}
                />
                {props.isOwner && (
                    <input className={s.uploadPhoto} type={'file'} onChange={onMainPhotoSelected} />
                )}
            </div>
            {editMode ? (
                <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
            ) : (
                <ProfileData
                    profile={profile}
                    isOwner={props.isOwner}
                    goEditMode={() => {
                        setEditMode(true)
                    }}
                />
            )}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    )
}
const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contact}>
            {contactTitle}: <a href={contactValue || ''}>{contactValue || 'Не указано'}</a>
        </div>
    )
}
const ProfileData = ({profile, isOwner, goEditMode}) => {
    return (
        <>
            <div className={s.fullName}>{profile.fullName}</div>
            {isOwner && <button onClick={goEditMode}>edit</button>}
            <div>Ищу работу:{profile.lookingForAJob ? 'да' : 'нет'}</div>
            <div>Обо мне:{profile.aboutMe}</div>
            {profile.lookingForAJobDescription && (
                <div>Мои навыки:{profile.lookingForAJobDescription}</div>
            )}
            <div>
                Мои контакты:
                {Object.keys(profile.contacts).map((key) => (
                    <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                ))}
            </div>
        </>
    )
}

export default ProfileInfo
