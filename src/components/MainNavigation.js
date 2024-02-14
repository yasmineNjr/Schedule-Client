import classes from './MainNavigation.module.css';
import {Link} from 'react-router-dom';

function MainNavigation(){
    return <header className={classes.header}>
        <h1><Link to="/">SchedulerEase</Link></h1>
        <nav>
            <ul>
                <li><Link to="/allMeetings">All</Link></li>
                <li><Link to="/newMeeting">New</Link></li>
                <li><Link to="/logIn">LogIn</Link></li>
            </ul>
        </nav>
    </header>
}

export default MainNavigation;