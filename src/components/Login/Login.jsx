import {Field, reduxForm} from 'redux-form'
import {maxLengthCreator, required} from '../utils/validators/validators'
import {Input} from '../common/FormsControls/FormsControls'

const maxLength = maxLengthCreator(20)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                placeholder={'login'}
                name={'login'}
                component={Input}
                validate={[required, maxLength]}
            />
            <Field
                placeholder={'password'}
                name={'password'}
                component={Input}
                validate={[required, maxLength]}
            />
            <Field component={Input} name={'rememberMe'} type={'checkbox'} /> remember me
            <button>Login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login',
})(LoginForm)

const Login = () => {
    const onSubmit = (values) => {
        alert(values.login)
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login
