// import { useParams } from "react-router-dom";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useContext } from "react";
import AppContext from '../../AppContext';

import io from "socket.io-client";
import MeetingList from "../Layouts/MeetingsList";
import EventComponent from "../Layouts/EventComponent";
import Button from "../Layouts/Button";

//const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://schedule-a-meeting-server-p1l0mt0p4-yasminenjr.vercel.app/");

const locales = {
	"en-US": require("date-fns/locale/en-US"),
  };
  
  const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
  });

function DiscussMeetingComponent() {

    const value = useContext(AppContext);
    let { globalMessage, globalName } = value.state;
    const [message, setMessage] = useState([]);
    const [selectedMeetings, setSelectedMeetings] = useState([]);
    
    useEffect(() => {
      socket.on("receive_final", (data) => {
        //alert(data.finalMessage);
        value.setFinalMessage(data.finalMessage);
        });
      }, [socket]);

    const sendMessage = () => {
		    socket.emit("send_message", { message });
        value.setGlobalMessage(message);

        //console.log(globalMessage);
	  };

    const handleSelected = (meet) => {
        let Meetings = selectedMeetings;
        Meetings.push(meet);
        setSelectedMeetings(Meetings);
        let global = globalMessage;
        global.map(m => 
          {
            if(m === meet){
              // m.selectedPersons = {...m.selectedPersons, globalName}
              let s ;
              if(m.selectedPersons.length === 0){
                s = ': ';
              }else{
                s = ' - ';
              }
              s += globalName;
              m.selectedPersons += s;
            }
          }
        );
        //console.log(global);
        setMessage(global);

	};

    return (
    <div style={{ backgroundColor: '#FBFCFC', display: 'flex', flexDirection: 'row', padding: '1rem'}}>
			<div style={{ display: 'flex', flexDirection: 'column', width: '30%', margin: '0.5rem'}}>
        <strong style={{color: '#1B4F72', fontSize: '1.2rem'}}>Plan a Meeting</strong>
        <p>{globalMessage[0].mainTitle}</p>
        <p>{globalMessage[0].description}</p>
        <MeetingList meetings={selectedMeetings}/>
        <hr/>
				<Button title='Send' color='#512E5F' onClick={sendMessage} />
			</div>
			
			<Calendar  
				localizer={localizer} 
				events={globalMessage} 
				startAccessor="start" 
				endAccessor="end" 
				onSelectEvent={handleSelected}
				style={{ height: 500, backgroundColor: 'white', width: '70%' }} 
        components={{
					event: EventComponent
				  }}
        />
		</div> 
    );
}

export default DiscussMeetingComponent;