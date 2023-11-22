import React from 'react';
import classes from './AllMeetingsComponent.module.css';
import CalendarComponent from '../Layouts/CalendarComponent';

function AllMeetingsComponent() {

	let determinedDate = [];
	const storedDate =  JSON.parse(localStorage.getItem("finalMessage") || "[]");
	if(storedDate !== null)
        determinedDate = storedDate;
    const source='all';
	return (
	<div className={classes.maindiv}>
		<CalendarComponent events={determinedDate} source={source}/>
	</div>
	)
	
}

export default AllMeetingsComponent;