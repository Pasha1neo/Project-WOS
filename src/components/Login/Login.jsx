import {Field, reduxForm} from 'redux-form'
import {maxLengthCreator, required} from '../utils/validators/validators'
import {Input} from '../common/FormsControls/FormsControls'
import {connect} from 'react-redux'
import {login} from '../../redux/authReducer'
import {Redirect} from 'react-router-dom'
import s from './Login.module.css'
const maxLength = maxLengthCreator(20)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                placeholder={'email'}
                name={'email'}
                component={Input}
                validate={[required, maxLength]}
                type={'email'}
            />
            <Field
                placeholder={'password'}
                name={'password'}
                component={Input}
                validate={[required, maxLength]}
                type={'password'}
            />
            <Field component={Input} name={'rememberMe'} type={'checkbox'} /> remember me
            {props.error && <div className={s.formSummaryError}>{props.error}</div>}
            <button>Login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login',
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})
export default connect(mapStateToProps, {login})(Login)
