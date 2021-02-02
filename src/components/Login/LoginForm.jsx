import style from './Login.module.css'

const LoginForm = () => {
    return (
        <form>
            <div>
                <input type={'text'} placeholder={'login'} />
            </div>
            <div>
                <input type={'password'} placeholder={'password'} />
            </div>
            <div>
                <input type={'checkbox'} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export default LoginForm
