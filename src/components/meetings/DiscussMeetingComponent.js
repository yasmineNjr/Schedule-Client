import classes from './DiscussMeetingComponent.module.css';
import React, { useState, useEffect } from "react";

import { useContext } from "react";
import AppContext from '../../AppContext';

import io from "socket.io-client";
import MeetingList from "../Layouts/MeetingsList";
import Button from "../Layouts/Button";
import CalendarComponent from '../Layouts/CalendarComponent';

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://schedule-a-meeting-server.onrender.com");

function DiscussMeetingComponent() {

    const value = useContext(AppContext);
    let { globalMessage, globalName } = value.state;
    
    const [message, setMessage] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    
    useEffect(() => {
      socket.on("receive_final", (data) => {
        value.setFinalMessage(data.finalMessage);
        });
      }, [socket]);

    const sendMessage = () => {
		    socket.emit("send_message", { message });
        value.setGlobalMessage(message);
	  };

    const handleSelected = (meet) => {
        let Meetings = selectedUsers;
        Meetings.push(meet);
        setSelectedUsers(Meetings);
        let global = globalMessage;
        global.map(m => 
          {
            if(m === meet){
              let str ;
              if(m.selectedPersons.length === 0){
                str = ': ';
              }else{
                str = ' - ';
              }
              str += globalName;
              m.selectedPersons += str;
            }
          }
        );
        setMessage(global);
	};

    return (
      <div className={classes.maindiv}>
        <div className={classes.div}>
          <strong className={classes.strong}>Plan a Meeting</strong>
          <p>{globalMessage[0].mainTitle}</p>
          <p>{globalMessage[0].description}</p>
          <MeetingList users={selectedUsers}/>
          <hr/>
          <Button title='Send' color='#512E5F' onClick={sendMessage} />
        </div>
          <CalendarComponent events={globalMessage} onSelectEvent={handleSelected} source='discuss'/>
      </div> 
    );
}

export default DiscussMeetingComponent;