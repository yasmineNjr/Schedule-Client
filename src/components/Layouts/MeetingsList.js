import { useState } from "react";
import MeetingItem from "./MeetingItem";
import classes from './MeetingList.module.css';

function MeetingList(props) {
    
    //const [usersList, setUsersList] = useState(props.users);

    return(
        props.usersList.length === 0 
            ?
            <div></div>
            :
            <ul className={classes.ul}>
                {
                    props.usersList.map( user => (
                        <MeetingItem key={user.title} user={user} setLst={props.setUsersList} lst={props.usersList} source={props.source}/>
                    ))
                }
            </ul>
    )
}

export default MeetingList;