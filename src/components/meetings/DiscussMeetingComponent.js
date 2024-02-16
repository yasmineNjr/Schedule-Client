import {useNavigate} from 'react-router-dom';
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

    const navigate = useNavigate();
    const value = useContext(AppContext);
    let { globalMessage, globalName, finalMessage } = value.state;

    const [message, setMessage] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    
    useEffect(() => {
      setSelectedUsers([]);
      if(!globalMessage[0].persons.some(g => g.title === globalName))
        navigate('/');
      // socket.on("receive_final", (data) => {
      //   value.setFinalMessage(data.finalMessage);
      //   });
      }, [globalMessage[0].code]);
      useEffect(() => {
        globalMessage.map(g => {
          if(g.isCompleted === 'true') {
            // let lst = [];
            // lst.push(g);
            // localStorage.setItem('finalMessage',JSON.stringify(lst));
            ///////////////
            let lst = [];
            // localStorage.clear();
            lst =  JSON.parse(localStorage.getItem("finalMessage") || "[]");
            console.log(lst);
            let storedlst = [];
            lst.map(l => storedlst.push(l));
            if(!storedlst.some(s => s.title === g.title)) 
              storedlst.push(g);
            localStorage.setItem('finalMessage',JSON.stringify(storedlst));
            ///////////////
          }
                
        })
        
      }, [globalMessage.some(g => g.isCompleted === 'true')]);

    const sendMessage = () => {
		    socket.emit("send_message", { message });
        value.setGlobalMessage(message);
	  };

    const handleSelected = (meet) => {
        let Meetings = selectedUsers;
        let global = globalMessage;

        if(!Meetings.some(m => m.title === meet.title)){
          setSelectedUser(meet);
          Meetings.push(meet);
          setSelectedUsers(Meetings);
          let mt;
          let str ;
          global.map(m => 
            {
              if(m.title === meet.title){
                if(m.selectedPersons.length === 0){
                  str = ': ';
                }else{
                  str = ' - ';
                }
                mt = m;
              }
            }
          );
          global = global.filter(g => g.title !== mt.title);
          str += globalName;
          mt.selectedPersons += str;
          global.push(mt);
        }else{
          setSelectedUser();
          Meetings.pop(meet);
          setSelectedUsers(Meetings);
          let mt;
          let str , per;
          global.map(m => 
            {
              if(m.title === meet.title){
                if(m.selectedPersons.length === 3){
                  str = ': ' + globalName;
                }if(m.selectedPersons.length > 3){
                  str = ' - ' + globalName;
                }
                mt = m;
                per = m.selectedPersons.replace( str , "");
              }
            }
          );
          global = global.filter(g => g.title !== mt.title);
          mt.selectedPersons = per;
          global.push(mt);
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
          {
            !globalMessage.some(g => g.isCompleted === 'true')
            ?
            <Button title='Send' color='#512E5F' onClick={sendMessage} />
            :
            <div></div>
          }
        </div>
          <CalendarComponent events={globalMessage} onSelectEvent={handleSelected} source='discuss'/>
      </div> 
    );
}

export default DiscussMeetingComponent;