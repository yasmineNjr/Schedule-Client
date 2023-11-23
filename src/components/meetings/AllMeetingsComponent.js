import React from 'react';
import classes from './AllMeetingsComponent.module.css';
import CalendarComponent from '../Layouts/CalendarComponent';
import { useContext } from "react";
import AppContext from '../../AppContext'

function AllMeetingsComponent() {

	const value = useContext(AppContext);
    let { globalName } = value.state;
	
	let determinedDate = [];
	const storedDate =  JSON.parse(localStorage.getItem("finalMessage") || "[]");
	if(storedDate !== null)
        determinedDate = storedDate;
    const source='all';
	let finalDeterminedDate = [];
	determinedDate.map(d => {
		const found = d.persons.some(p => p.title === globalName);
		if(d.owner === globalName || found){
			finalDeterminedDate.push(d);
		}
	});
	return (
	<div className={classes.maindiv}>
		<CalendarComponent events={finalDeterminedDate} source={source}/>
	</div>
	)
	
}

export default AllMeetingsComponent;