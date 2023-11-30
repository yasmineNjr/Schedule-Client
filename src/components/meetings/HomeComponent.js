import classes from './HomeComponent.module.css';
import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import io from "socket.io-client";

import { useContext } from "react";
import AppContext from '../../AppContext';
import Button from '../Layouts/Button';
import Input from '../Layouts/Input';

const socket = io.connect("http://localhost:3001");
// const socket = io.connect("https://schedule-a-meeting-server.onrender.com");

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
		});
		socket.on("receive_final", (data) => {
			value.setFinalMessage(data.finalMessage);
			});
	  }, [socket, value]);

	  const checkCodeHandler = () => {
		if(globalMessage.length > 0){
			if(globalName === '' || globalName === null){
				setResult('You are not logged in')
			}else{
				let userIsExist = globalMessage[0].persons.filter(m => m.title === globalName);
				if(globalMessage[0].code !== code.trim()){
					setResult('Chech your code.');
				}
				else{
					if(userIsExist.length === 0){
						setResult('You are not a member of this meeting.');
					}else{
						// navigate(`/DiscussMeeting/${message}`);
						navigate('/DiscussMeeting');
					}
				}
			}
		}else{
			console.log('no message');
		}
	  }

	return <section className={classes.maincontainer}>
			<div className={classes.maindiv}>
				<h3 className={classes.h3}>
                The Meeting Planning App is an application that allows users to determine meeting times together with all users who will attend the meeting.
				</h3>
				<div className={classes.innerdiv}>
					<div className={classes.inputdiv}>
						<Input type="text" placeholder="Code..." value={code} onChange={(event) => setCode(event.target.value)}/>
					</div>
					<Button title='Discuss a Meeting' color='#D4AC0D' onClick={checkCodeHandler}  />
				</div>
				<strong className={classes.strong}>{result}</strong>
			</div>
			<div className={classes.imgdiv}>
                <img src='/images/logo3.jpg' alt='An image showing a meeting' height={547}/>
			</div>
		</section>
}

export default HomeComponent;