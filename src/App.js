import './app.css'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import {Component, lazy} from 'react'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import Preloader from './components/common/Preloader/Preloader'
import Navbar from './components/Navbar/Navbar'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import {initializeApp} from './redux/appReducer'
import store from './redux/redux-store'
import {withSuspense} from './components/hoc/withSuspense'
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const LoginPage = lazy(() => import('./components/Login/Login'))

class App extends Component {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route exact path='/' render={() => <>GeneralPage</>} />
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
                    <Route path='/users' render={() => <UsersContainer />} />
                    <Route path='/login' render={withSuspense(LoginPage)} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

let AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)
let SamuraiJSApp = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}
export default SamuraiJSApp
