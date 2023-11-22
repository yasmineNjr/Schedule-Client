import { useState } from "react";
import MeetingItem from "./MeetingItem";
import classes from './MeetingList.module.css';

function MeetingList(props) {
    
    const [usersList, setUsersList] = useState(props.users);

    return(
        usersList.length === 0 
            ?
            <div></div>
            :
            <ul className={classes.ul}>
                {
                    usersList.map( user => (
                        <MeetingItem key={user.title} user={user} setLst={setUsersList} lst={usersList}/>
                    ))
                }
            </ul>
    )
}

export default MeetingList;