import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import io from "socket.io-client";
import MeetingList from "../Layouts/MeetingsList";
import EventComponent from "../Layouts/EventComponent";
import { useContext } from "react";
import AppContext from '../../AppContext';
import Input from "../Layouts/Input";
import Button from "../Layouts/Button";
import addCalendarEvent from '../../GoogleCalendar';

// const socket = io.connect("http://localhost:3001");
// const socket = io.connect("https://schedule-a-meeting-server-p1l0mt0p4-yasminenjr.vercel.app/");
const socket = io.connect("https://schedule-a-meeting-server.onrender.com");

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

	const sendMessage = () => {
		let c = generateCode();
		setCode(c);

		for(let i=0; i< message.length ; i++){
			message[i].code = c;
			message[i].persons = persons;
			message[i].owner = globalName;
		}
		//alert(message);
		//socket.emit("send_message", { message, code });
		socket.emit("send_message", { message });
		console.log(message);
	  };
	const sendFinalMessage = () => {
		socket.emit("send_final", { finalMessage });
		value.setFinalMessage(finalMessage);
		localStorage.setItem('finalMessage',JSON.stringify(finalMessage));
		const x = JSON.parse(localStorage.getItem("finalMessage") || "[]");
		// console.log(x);
		// alert(finalMessage);
	};
	const addPersonHandler = (event) => {
		event.preventDefault();
		let p = persons;
		p.push(person);
		setPersons(p);
		//console.log(persons);
	}
	  useEffect(() => {
		socket.on("receive_message", (data) => {
		  //setMessageReceived(data.message);
		  setMessage(data.message);
		  //alert(data.message);
		  //console.log(data.message);
		  value.setGlobalMessage(data.message);
		});
		socket.on("receive_final", (data) => {
			//alert(data.finalMessage);
			value.setFinalMessage(data.finalMessage);
		  });
	  }, [socket]);
	
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
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '10rem'}}>
				<strong style={{color: '#1B4F72', fontSize: '1.2rem'}}>You have to log in</strong>
			</div>
			:
			<div style={{ backgroundColor: '#FBFCFC', display: 'flex', flexDirection: 'row', padding: '1rem'}}>
				<div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '0.5rem', marginRight: '0.5rem', overflow: 'auto'}}>
					<strong style={{color: '#1B4F72', fontSize: '1.2rem'}}>Plan a Meeting</strong>
					<hr style={{ color: 'black'}}/>
					
					{/* <input   type="text" placeholder="Title..."  value={newSuggustion.mainTitle} onChange={(e) => setNewSuggestion({ ...newSuggustion, mainTitle: e.target.value })} /> */}
					<Input type="text" placeholder="Title..." value={newSuggustion.mainTitle} onChange={(e) => setNewSuggestion({ ...newSuggustion, mainTitle: e.target.value })}/>
					<Input type="description" placeholder="Description..."  value={newSuggustion.description} onChange={(e) => setNewSuggestion({ ...newSuggustion, description: e.target.value })} />
					<hr style={{ color: 'black', width: '98%'}}/>
					
					<Input type="text" placeholder="Suggestion..."  value={newSuggustion.title} onChange={(e) => setNewSuggestion({ ...newSuggustion, title: e.target.value })} />
					<div style={{marginBottom: '0.25rem'}} >
						<DatePicker placeholderText="Start Date..." selected={newSuggustion.start} onChange={(start) => setNewSuggestion({ ...newSuggustion, start })} />
					</div>
					<div style={{marginBottom: '0.25rem'}} >
						<DatePicker placeholderText="End Date..." style={{margin: '1rem', backgroundColor: 'red'}} selected={newSuggustion.end} onChange={(end) => setNewSuggestion({ ...newSuggustion, end })} />
					</div>
					<Button title='Add Suggestion' color='#D4AC0D' onClick={handleAddSuggestion} />
					<hr style={{ color: 'black', width: '98%'}}/>

					<Input type="text" placeholder="Person..." value={person.title} onChange={(e) => {e.preventDefault(); setPerson({title: e.target.value });}}/>
					<Button title='Add Person' color='#D4AC0D' onClick={addPersonHandler} />
					<MeetingList meetings={persons}/>
					<hr style={{ color: 'black', width: '98%'}}/>

					<Input type="text" placeholder="Code..." readonly="readonly" value={code}/>
					<Button title='Generate Code & Send' color='#512E5F' onClick={sendMessage} />
					<hr style={{ color: 'black', width: '98%'}}/>

					<Button title='Determine Final Date' color='#D35400' onClick={sendFinalMessage}/>

					{/* <Button title='Google Calendar' color='#D35400' onClick={googleCalendarHandler}/> */}
				</div>
				<Calendar  
					localizer={localizer} 
					events={message} 
					startAccessor="start" 
					endAccessor="end" 
					onSelectEvent={handleSelected}
					style={{ height: 500, backgroundColor: 'white', width: '70%' }} 
					components={{
						event: EventComponent
					}}/>
			</div> 
		}
		</div>
	);
}

export default NewMeetingComponent;