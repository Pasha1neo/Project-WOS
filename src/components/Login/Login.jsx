import {reduxForm} from 'redux-form'
import {maxLengthCreator, required} from '../utils/validators/validators'
import {CreateField, Input} from '../common/FormsControls/FormsControls'
import {connect} from 'react-redux'
import {login} from '../../redux/authReducer'
import {Redirect} from 'react-router-dom'
import s from './Login.module.css'
const maxLength = maxLengthCreator(20)

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField('email', 'email', [required, maxLength], Input, 'email')}
            {CreateField('password', 'password', [required, maxLength], Input, 'password')}
            {CreateField('', 'rememberMe', [], Input, 'checkbox', 'remember me')}
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && CreateField('captcha', 'captcha', [required], Input, 'text')}
            {error && <div className={s.formSummaryError}>{error}</div>}
            <button>Login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login',
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})
export default connect(mapStateToProps, {login})(Login)
