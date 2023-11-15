import { useState } from "react";
import MeetingItem from "./MeetingItem";

function MeetingList(props) {

    const [lst, setLst] = useState(props.meetings);

    return(
            lst.length === 0 
            ?
            <div></div>
            :
            <ul style={{listStyle: 'none', padding: '0.5rem', marginTop: '0.3rem', overflow: 'auto', maxHeight: '5rem' , 
                        backgroundColor: '#DAF7A6', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        }}>
                {
                    lst.map( meet => (
                        <MeetingItem key={meet.title} meet={meet} setLst={setLst} lst={lst}/>
                    )
    
                    )
                }
            </ul>
       
    )
}

export default MeetingList;