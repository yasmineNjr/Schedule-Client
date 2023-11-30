import classes from './DiscussMeetingComponent.module.css';
import React, { useState, useEffect } from "react";

import { useContext } from "react";
import AppContext from '../../AppContext';

import io from "socket.io-client";
import MeetingList from "../Layouts/MeetingsList";
import Button from "../Layouts/Button";
import CalendarComponent from '../Layouts/CalendarComponent';

const socket = io.connect("http://localhost:3001");
// const socket = io.connect("https://schedule-a-meeting-server.onrender.com");

function DiscussMeetingComponent() {

    const value = useContext(AppContext);
    let { globalMessage, globalName } = value.state;
    
    const [message, setMessage] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
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
        let global = globalMessage;
        
        if(!Meetings.some(m => m.title === meet.title)){
          console.log('if');
          setSelectedUser(meet);
          Meetings.push(meet);
          setSelectedUsers(Meetings);
          global.map(m => 
            {
              if(m === meet){
                let str ;
                if(m.selectedPersons.length === 0){
                  console.log('inner if');
                  str = ': ';
                }else{
                  console.log('inner else');
                  str = ' - ';
                }
                str += globalName;
                m.selectedPersons += str;
              }
            }
          );
        }else{
          console.log('else');
          setSelectedUser();
          Meetings.pop(meet);
          setSelectedUsers(Meetings);
          global.map(m => 
            {
              if(m === meet){
                let str ;
                if(m.selectedPersons.length === 2){
                  console.log('2');
                  str = ': ' + globalName;
                  m.selectedPersons.replace( str , "");
                }if(m.selectedPersons.length > 2){
                  console.log('more 2');
                  str = ' - ' + globalName;
                  m.selectedPersons.replace( str , "");
                }
              }
            }
          );
        }
        setMessage(global);
        value.setGlobalMessage(global);
	};

    return (
      <div className={classes.maindiv}>
        <div className={classes.div}>
          <strong className={classes.strong}>Plan a Meeting</strong>
          <p>{globalMessage[0].mainTitle}</p>
          <p>{globalMessage[0].description}</p>
          <MeetingList usersList={selectedUsers} setUsersList={setSelectedUsers} source='discuss'/>
          <hr/>
          <Button title='Send' color='#512E5F' onClick={sendMessage} />
        </div>
          <CalendarComponent events={globalMessage} onSelectEvent={handleSelected} source='discuss'/>
      </div> 
    );
}

export default DiscussMeetingComponent;