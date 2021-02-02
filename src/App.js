import './app.css'
import {Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import UsersContainer from './components/Users/UsersContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import LoginPage from './components/Login/Login'
import GeneralPage from './GeneralPage'
export default function App() {
    return (
        <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Route exact path='/' render={() => <GeneralPage />} />
                <Route path='/dialogs' render={() => <DialogsContainer />} />
                <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                <Route path='/users' render={() => <UsersContainer />} />
                <Route path='/login' render={() => <LoginPage />} />
            </div>
        </div>
    )
}
