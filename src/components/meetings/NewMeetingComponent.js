import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import classes from './NewMeetingComponent.module.css';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';

// import Datetime from 'react-datetime';
// import 'react-datetime/css/react-datetime.css';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import io from "socket.io-client";
import MeetingList from "../Layouts/MeetingsList";
import { useContext } from "react";
import AppContext from '../../AppContext';
import Input from "../Layouts/Input";
import Button from "../Layouts/Button";
import CalendarComponent from "../Layouts/CalendarComponent";
import {gapiLoaded, gisLoaded, handleAuthClick} from '../../GoogleCalendarHelper';

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://schedule-a-meeting-server.onrender.com");

function NewMeetingComponent() {
	
	const value = useContext(AppContext);
    let { globalMessage, globalName, globalGmail } = value.state;
	// const navigate = useNavigate();

	const [newSuggustion, setNewSuggestion] = useState({ mainTitle: "", description: "", title: "", start: "", end: "", code: "", owner: "", persons: [], selectedPersons: '', isCompleted: 'false'});
    const [allSuggestion, setAllSuggestions] = useState([]);
	const [code, setCode] = useState('Code...');
	const [message, setMessage] = useState([]);
	const [finalMessage, setFinalMessage] = useState([]);
	const [persons, setPersons] = useState([]);
	const [person, setPerson] = useState({ title: ""});
	// const [startTime, setStartTime] = useState(new Date());
	const [selectedMeet, setSelectedMeet] = useState({});

	// const [endTime, setEndTime] = useState('10:00');
	// const onChangeStartTime = (value) => {
    //     setStartTime(value);
    //   };
	// const onChangeEndTime = (value) => {
    //     setEndTime(value);
    //   };
	// const [getDate, setGetDate] = useState(new Date());
	// const handleChange = (value) => {
    //     setGetDate(value);
    //   };
	
	const sendMessage = () => {
		let c = generateCode();
		setCode(c);

		for(let i=0; i< message.length ; i++){
			message[i].code = c;
			message[i].persons = persons;
			message[i].owner = globalName;
		}
		//socket.emit("send_message", { message, code });
		socket.emit("send_message", { message });
		// console.log(message);
	  };
	const sendFinalMessage = () => {
		let msg = message;
		msg.map(m => {if(m.title === selectedMeet.title) m.isCompleted = 'true'});
		setMessage(msg);
		sendMessage();
		socket.emit("send_final", { finalMessage });
		value.setFinalMessage(finalMessage);
		///////////////
		let lst = [];
		// localStorage.clear();
		lst =  JSON.parse(localStorage.getItem("finalMessage") || "[]");
		console.log(lst);
		let storedlst = [];
		lst.map(l => storedlst.push(l));
		finalMessage.map(f => storedlst.push(f));
		console.log(storedlst);
		localStorage.setItem('finalMessage',JSON.stringify(storedlst));
		///////////////
	};
	const addPersonHandler = (event) => {
		event.preventDefault();
		let p = persons;
		if(!p.some(per => per.title === person.title)){
			p.push(person);
			setPersons(p);
		}
		setPerson({ title: ""});
	}
	useEffect(() => {
		socket.on("receive_message", (data) => {
			if(data.message[0].owner === globalName)
			{
				setMessage(data.message);
				value.setGlobalMessage(data.message);
			}
		});
		socket.on("receive_final", (data) => {
			// if(data.finalMessage.owner === globalName)
			// {
				value.setFinalMessage(data.finalMessage);
			// }
		  });
	  }, [socket, value]);
	
    function handleAddSuggestion() {
		const startDate = new Date (newSuggustion.start);
		const endDate = new Date (newSuggustion.end);
		if( (startDate > endDate) || 
			(newSuggustion.start === '') || 
			(newSuggustion.end === '') ||
			(newSuggustion.title === '') ||
			(newSuggustion.description === '')){
			console.log("wrong date!"); 
            return;
		}
		const all = allSuggestion;
		all.push(newSuggustion);
		setAllSuggestions(all);
		setMessage(all);
		setNewSuggestion({ ...newSuggustion, title: "", start: "", end: ""});
	}
	const handleSelected = (meet) => {
		setSelectedMeet(meet);
		if(meet.code !== ''){
			let lst = [];
			lst.push(meet);
			setFinalMessage(lst);
		}else{
			let all = allSuggestion;
			all = all.filter(a => a.title !== meet.title);
			setAllSuggestions(all);
			setMessage(all);
			// console.log(all)
		}
	};
	const keyPressed = (meet) => {
		const keyDownHandler = event => {
			if (event.key === 'D' || event.key === 'd') {
			  event.preventDefault();
	  
			  // 👇️ your logic here
			  console.log('key');
			}
		  };
		  document.addEventListener('keydown', keyDownHandler);
	  
		  return () => {
			document.removeEventListener('keydown', keyDownHandler);
		  };
	}
	const doubleClick = (meet) => {
		// let lst = allSuggestion;
		// lst = lst.filter((item) => item.title !== meet.title);
		// setAllSuggestions(lst);
		// setMessage(lst);
		console.log('double');
	}
	function generateCode() {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < 7) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
		}
		return result;
	}
	function googleCalendarHandler() {
		const date = new Date();
		const dateAsString = date.toString();
		const timeZone = dateAsString.match(/\(([^\)]+)\)$/)[1];
		// let x = finalMessage[0].end.toISOString();
		// console.log(finalMessage[0].end.format("YYYY-MM-DD hh:mm:ss A Z"));
		// console.log(finalMessage[0].end.toISOString());
		
		// var startDate = new Date(finalMessage[0].start);
		// var startMinutes = startDate.getMinutes();
		// if(startMinutes.toString().length===1) startMinutes = '0'+ startMinutes;
		// var startHours = startDate.getHours();
		// if(startHours.toString().length<2) startHours = '0'+ startHours;
		// var endDate = new Date(finalMessage[0].end);
		// var endMinutes = endDate.getMinutes();
		// if(endMinutes.toString().length===1) endMinutes = '0'+ endMinutes;
		// var endHours = endDate.getHours();
		// if(endHours.toString().length<2) endHours = '0'+ endHours;
		
		// console.log('2023-11-20T09:00:00-07:00');
		// const start = finalMessage[0].start.split('T')[0] + 'T' + startHours + ':' + startMinutes + ':00-07:00';
		// const end = finalMessage[0].end.split('T')[0] + 'T' + endHours + ':' + endMinutes + ':00-07:00';
		// console.log(start);
		// console.log(end);

		// let startDateTime = new Date("2023-11-28T09:00:00-07:00");
		// let endDateTime = new Date("2023-11-28T17:00:00-07:00");
		gapiLoaded();
		gisLoaded();
		handleAuthClick(finalMessage[0].mainTitle, 
						"800 Howard St., San Francisco, CAAAA 94103",
						finalMessage[0].description, 
						finalMessage[0].start, 
						finalMessage[0].end, 
						timeZone, 
						globalGmail);
		// navigate('/GoogleCalendar');
	}
	return(  
		<div>
		{
			globalName === '' || globalName === null
			?
			<div className={classes.logindiv}>
				<strong className={classes.strong}>You are not logged in</strong>
			</div>
			:
			<div className={classes.maindiv}>
				<div className={classes.entriesdiv}>
					<strong className={classes.strong}>Meeting Information</strong>
					<hr/>
					
					<Input type="text" placeholder="Title..." width='94%' value={newSuggustion.mainTitle} onChange={(e) => setNewSuggestion({ ...newSuggustion, mainTitle: e.target.value })}/>
					<Input type="description" placeholder="Description..." width='94%' value={newSuggustion.description} onChange={(e) => setNewSuggestion({ ...newSuggustion, description: e.target.value })} />
					<hr className={classes.hr}/>
					
					<Input type="text" placeholder="Suggestion..." width='94%' value={newSuggustion.title} onChange={(e) => setNewSuggestion({ ...newSuggustion, title: e.target.value })} />
					{/* <div style={{marginBottom: '0.25rem'}} >
						<DatePicker placeholderText="Start Date..." selected={newSuggustion.start} onChange={(start) => setNewSuggestion({ ...newSuggustion, start })} />
					</div>
					<div style={{marginBottom: '0.25rem'}} >
						<DatePicker placeholderText="End Date..." style={{margin: '1rem', backgroundColor: 'red'}} selected={newSuggustion.end} onChange={(end) => setNewSuggestion({ ...newSuggustion, end })} />
					</div> */}
					{/* <div style={{marginBottom: '0.25rem'}} >
						<DateTimePicker />
					</div> */}
					{/* <div style={{marginBottom: '0.25rem'}} >
						 <Datetime
							onChange={onChangeStartTime}
							value={startTime}
							dateFormat={false}
							inputProps={{ placeholder: 'Start time' }}
						/>
					</div>
					<div style={{marginBottom: '0.25rem'}} >
						 <Datetime
							onChange={onChangeEndTime}
							value={endTime}
							dateFormat={false}
							inputProps={{ placeholder: 'End time' }}
						/>
					</div> */}
					<div className={classes.pickerdiv} >
						 <DateTimePicker
						 	placeholderText="Start Date..."
							format={"yyyy-MM-dd hh:mm a"}
							onChange={(start) => setNewSuggestion({ ...newSuggustion, start })}
							value={newSuggustion.start}
							width={200}
						/>
					</div>
					<div className={classes.pickerdiv} >
						 <DateTimePicker
						 	placeholderText="End Date..."
							format={"yyyy-MM-dd hh:mm a"}
							onChange={(end) => setNewSuggestion({ ...newSuggustion, end })}
							value={newSuggustion.end}
							width={200}
						/>
					</div>
					<Button title='Add Suggestion' color='#D4AC0D' width='98%' onClick={handleAddSuggestion} />
					<hr className={classes.hr}/>

					<Input type="text" placeholder="Person..." width='94%' value={person.title} onChange={(e) => {e.preventDefault(); setPerson({title: e.target.value });}}/>
					<Button title='Add Person' color='#D4AC0D' width='98%' onClick={addPersonHandler} />
					<MeetingList usersList={persons} setUsersList={setPersons} source='new'/>
					<hr className={classes.hr}/>

					<Input type="text" placeholder="Code..." width='94%' readonly="readonly" value={code}/>
					<Button title='Generate Code & Send' color='#512E5F' width='98%' onClick={sendMessage} />
					<hr className={classes.hr}/>

				</div>
				<div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
					<CalendarComponent  events={message} 
										onSelectEvent={handleSelected} 
										onKeyPressEvent={keyPressed}
										onDoubleClickEvent={doubleClick}
										source='new'
					/>
					<div style={{width: '100%',display: 'flex', flexDirection: 'row', height: '2rem'}}>
						{finalMessage.length !== 0
							?
							<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', marginLeft: '1rem', marginRight: '1rem'}}>
								<Button title='Determine Final Date' color='#810541' width='75%' onClick={sendFinalMessage}/>
							</div>
							:
							<div/>
						}
						{finalMessage.length !== 0
							?
							<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', marginLeft: '1rem', marginRight: '1rem'}}>
								<Button title='Google Calendar' color='#D35400' width='75%' onClick={googleCalendarHandler}/>
							</div>
							:
							<div/>
						}
					</div>
				</div>
			</div> 
		}
		</div>
	);
}

export default NewMeetingComponent;