import {NavLink} from 'react-router-dom'
import styles from './Header.module.css'
import logo from './logo.png'

const Header = (props) => {
    return (
        <header className={styles.header}>
            <NavLink to='/'>
                <img alt='Логотип' src={logo} />
            </NavLink>
            <div className={styles.loginBlock}>
                {props.isAuth ? (
                    <div>
                        {props.login}
                        <button onClick={props.logout}>logout</button>
                    </div>
                ) : (
                    <NavLink to={'/login'}>Login</NavLink>
                )}
            </div>
        </header>
    )
}

export default Header
