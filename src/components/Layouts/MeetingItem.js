import {AiFillDelete} from 'react-icons/ai';
function MeetingItem(props) {
    
    function deleteHandler(){
        
        const meetLst = props.lst.filter(l => l !== props.meet);
        props.setLst(meetLst);
    }

    return(
        <li style={{}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '2rem'}}>
                <h5 style={{width: '90%', padding: '0.5rem', color: '#21618C'}}>{props.meet.title}</h5>
                <AiFillDelete style={{padding: '0.5rem', color: 'red'}} onClick={deleteHandler}/>
            </div>
        </li>
    )
}

export default MeetingItem;