import {reduxForm} from 'redux-form'
import {CreateField, Input, Textarea} from '../../common/FormsControls/FormsControls'
import s from './ProfileInfo.module.css'

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>FullName: {CreateField('Full Name', 'fullName', [], Input, 'text')}</div>

            <div>Ищу работу:{CreateField('', 'lookingForAJob', [], Input, 'checkbox')}</div>
            <div>
                Обо мне:
                {CreateField('Напишите о себе', 'aboutMe', [], Textarea, 'text')}
            </div>
            <div>
                Мои навыки:{' '}
                {CreateField('что умеете?', 'lookingForAJobDescription', [], Textarea, 'text')}
            </div>
            <div>
                Мои контакты:
                {Object.keys(profile.contacts).map((key) => (
                    <div key={key} className={s.contact}>
                        {key}:{CreateField(`${key}`, `contacts.${key}`, [], Input, 'text')}
                    </div>
                ))}
            </div>
            <button>save</button>
            {error && <div className={s.formSummaryError}>{error}</div>}
        </form>
    )
}
const ProfileDataFormReudxForm = reduxForm({form: 'editProfile'})(ProfileDataForm)
export default ProfileDataFormReudxForm
