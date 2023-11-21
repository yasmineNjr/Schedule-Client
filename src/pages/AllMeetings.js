import React,{useEffect , useContext} from 'react';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import io from "socket.io-client";
import AppContext from '../AppContext';

//const socket = io.connect("http://localhost:3001");
//const socket = io.connect("https://schedule-a-meeting-server-p1l0mt0p4-yasminenjr.vercel.app/");
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

function AllMeetings() {

	// const value = useContext(AppContext);
    // let { finalMessage } = value.state;
	
	// useEffect(() => {
	// 	socket.on("receive_final", (data) => {
	// 	  alert(data.finalMessage);
	// 	  value.setFinalMessage(data.finalMessage);
	// 	});
	//   }, [socket, value]);
	// function storeHandler(){
	// 	// let lst = ['x', 'y', 'z']
	// 	// // To store data
	// 	// localStorage.setItem('lst', lst);

	// 	// // To retrieve data
	// 	// const x = localStorage.getItem('lst');

	// 	// // To clear a specific item
	// 	// localStorage.removeItem('Name');

	// 	// // To clear the whole data stored in localStorage
	// 	// localStorage.clear();

	// 	// console.log(x[0]);
	// }

	let finalMessage = [];
	const final =  JSON.parse(localStorage.getItem("finalMessage") || "[]");
	if(final !== null)
		finalMessage = final;

	return (
	<div style={{ backgroundColor: '#FBFCFC', display: 'flex', justifyContent: 'center'}}>
		{/* <button onClick={storeHandler}>store</button> */}
		<Calendar  
			localizer={localizer} 
			events={finalMessage} 
			startAccessor="start" 
			endAccessor="end" 
			style={{ height: 500, backgroundColor: 'white', width: '90%', margin: '2rem' }} 
			/>
		</div>
	)
	
}

export default AllMeetings;