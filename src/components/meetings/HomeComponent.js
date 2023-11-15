import classes from './HomeComponent.module.css';
import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import io from "socket.io-client";

import { useContext } from "react";
import AppContext from '../../AppContext';
import Button from '../Layouts/Button';
import Input from '../Layouts/Input';

// const socket = io.connect("http://localhost:3001");
// const socket = io.connect("https://schedule-a-meeting-server-p1l0mt0p4-yasminenjr.vercel.app/");
const socket = io.connect("https://schedule-a-meeting-server.onrender.com");

function HomeComponent() {

	const value = useContext(AppContext);
	let { globalMessage, globalName } = value.state;

    const navigate = useNavigate();
	
	const [messageReceived, setMessageReceived] = useState("");
	const [code, setCode] = useState('Code...');
	const [result, setResult] = useState('');

	  useEffect(() => {
		socket.on("receive_message", (data) => {
		  setMessageReceived(data.message);
		  value.setGlobalMessage(data.message);
		  //alert(data.message);
		  //console.log(data.message);
		});
		socket.on("receive_final", (data) => {
			//alert(data.finalMessage);
			value.setFinalMessage(data.finalMessage);
			});
	  }, [socket]);

	  const checkCodeHandler = () => {
		if(globalMessage.length > 0){
			if(globalName === '' || globalName === null){
				setResult('You have to log in')
			}else{
				let userIsExist = globalMessage[0].persons.filter(m => m.title === globalName);
				// console.log(userIsExist);
				if(globalMessage[0].code !== code.trim()){
					setResult('Your code is not correct');
				}
				else{
					if(userIsExist.length === 0){
						setResult('You do not have permissions to discuss this meeting.');
					}else{
						// navigate(`/DiscussMeeting/${message}`);
						navigate('/DiscussMeeting');
					}
				}
			}
		}else{
			alert('no message');
		}
	  }
	
	return <section style={{display:'flex', flexDirection: 'row'}}>
			<div style={{width: 385, height: 450 ,margin: '5rem'}}>
				<h3 style={{color: '#21618C '}}>
                The Meeting Planning App is an application that allows users to determine meeting times together with all users who will attend the meeting.
				</h3>
				<div style={{ marginTop: '7rem', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					<div  style={{marginRight: '1rem'}}>
						<Input type="text" placeholder="Code..." value={code} onChange={(event) => setCode(event.target.value)}/>
					</div>
					<Button title='Discuss a Meeting' color='#D4AC0D' onClick={checkCodeHandler}  />
				</div>
				<strong style={{color: '#1B4F72', fontSize: '1.2rem'}}>{result}</strong>
			</div>
			<div style={{width: 500 }}>
                <img src='/images/meeting3.jpg' alt='An image showing Meting' height={547}/>
			</div>
		</section>
}

export default HomeComponent;