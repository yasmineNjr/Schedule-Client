import {AiFillDelete} from 'react-icons/ai';
import classes from './MeetingItem.module.css';
function MeetingItem(props) {
    
    function onClickHandler(){
        const usersLst = props.lst.filter(u => u.title !== props.user.title);
        props.setLst(usersLst);
    }

    return(
        <li>
            <div className={classes.maindiv}>
                <h5 className={classes.h5}>{props.user.title}</h5>
                {
                    props.source !== 'discuss' 
                    ?
                    <AiFillDelete style={{padding: '0.5rem', color: '#D35400'}} onClick={onClickHandler}/>
                    :
                    <div></div>
                }
                
            </div>
            <hr style={{width: '100%'}} />
        </li>
    )
}

export default MeetingItem;