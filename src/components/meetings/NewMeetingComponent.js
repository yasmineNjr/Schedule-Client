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
import addCalendarEvent from '../../GoogleCalendar';
import CalendarComponent from "../Layouts/CalendarComponent";

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://schedule-a-meeting-server.onrender.com");

function NewMeetingComponent() {
	
	const value = useContext(AppContext);
    let { globalMessage, globalName } = value.state;
	
	const [newSuggustion, setNewSuggestion] = useState({ mainTitle: "", description: "", title: "", start: "", end: "", code: "", owner: "", persons: [], selectedPersons: '' });
    const [allSuggestion, setAllSuggestions] = useState([]);
	const [code, setCode] = useState('Code...');
	const [message, setMessage] = useState([]);
	const [finalMessage, setFinalMessage] = useState([]);
	const [persons, setPersons] = useState([]);
	const [person, setPerson] = useState({ title: ""});
	// const [startTime, setStartTime] = useState(new Date());
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
		console.log(message);
	  };
	const sendFinalMessage = () => {
		socket.emit("send_final", { finalMessage });
		value.setFinalMessage(finalMessage);
		localStorage.setItem('finalMessage',JSON.stringify(finalMessage));
	};
	const addPersonHandler = (event) => {
		event.preventDefault();
		let p = persons;
		p.push(person);
		setPersons(p);
	}
	  useEffect(() => {
		socket.on("receive_message", (data) => {
		  setMessage(data.message);
		  value.setGlobalMessage(data.message);
		});
		socket.on("receive_final", (data) => {
			value.setFinalMessage(data.finalMessage);
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
		console.log(message);
	}
	const handleSelected = (meet) => {
		let lst = [];
		lst.push(meet);
		setFinalMessage(lst);
	};
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
		addCalendarEvent('2023-06-28T09:00:00-07:00', 'address', 'clientName');
		
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
					
					<Input type="text" placeholder="Title..." value={newSuggustion.mainTitle} onChange={(e) => setNewSuggestion({ ...newSuggustion, mainTitle: e.target.value })}/>
					<Input type="description" placeholder="Description..."  value={newSuggustion.description} onChange={(e) => setNewSuggestion({ ...newSuggustion, description: e.target.value })} />
					<hr className={classes.hr}/>
					
					<Input type="text" placeholder="Suggestion..."  value={newSuggustion.title} onChange={(e) => setNewSuggestion({ ...newSuggustion, title: e.target.value })} />
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
							width={250}
						/>
					</div>
					<div className={classes.pickerdiv} >
						 <DateTimePicker
						 	placeholderText="End Date..."
							format={"yyyy-MM-dd hh:mm a"}
							onChange={(end) => setNewSuggestion({ ...newSuggustion, end })}
							value={newSuggustion.end}
							width={250}
							
						/>
					</div>
					<Button title='Add Suggestion' color='#D4AC0D' onClick={handleAddSuggestion} />
					<hr className={classes.hr}/>

					<Input type="text" placeholder="Person..." value={person.title} onChange={(e) => {e.preventDefault(); setPerson({title: e.target.value });}}/>
					<Button title='Add Person' color='#D4AC0D' onClick={addPersonHandler} />
					<MeetingList users={persons}/>
					<hr className={classes.hr}/>

					<Input type="text" placeholder="Code..." readonly="readonly" value={code}/>
					<Button title='Generate Code & Send' color='#512E5F' onClick={sendMessage} />
					<hr className={classes.hr}/>

					<Button title='Determine Final Date' color='#D35400' onClick={sendFinalMessage}/>

					<Button title='Google Calendar' color='#D35400' onClick={googleCalendarHandler}/>
				</div>
					<CalendarComponent events={message} onSelectEvent={handleSelected} source='new'/>
			</div> 
		}
		</div>
	);
}

export default NewMeetingComponent;