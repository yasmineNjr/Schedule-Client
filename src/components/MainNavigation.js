import classes from './MainNavigation.module.css';
import {Link} from 'react-router-dom';

function MainNavigation(){
    return <header className={classes.header}>
        <h1><Link to="/">Meeting Planning App</Link></h1>
        <nav>
            <ul>
                <li><Link to="/allMeetings">All Meetings</Link></li>
                <li><Link to="/newMeeting">Arrange a Meeting</Link></li>
                <li><Link to="/logIn">LogIn</Link></li>
            </ul>
        </nav>
    </header>
}

export default MainNavigation;