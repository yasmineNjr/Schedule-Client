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

	return (
		<div  style={{ width: '100%',
			height: '100%', 
			backgroundColor: 'red', 
			backgroundImage: 'linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.22)),url("/images/logo3.jpg")',
			backgroundPosition: 'center', /* Center the image */
			backgroundRepeat: 'no-repeat', /* Do not repeat the image */
			backgroundSize: 'cover', /* Resize the background image to cover the entire container */
			position:'relative',
			float:'left',
			color:'white',
			overflow:'hidden',
			// transform: 'translateZ(-10rem)',
			// zIndex: '100',
		}}>
			<section className={classes.maincontainer} >
				<div className={classes.maindiv}>
					{/* <h1 className={classes.h1}>
					A meeting planning app allows a group of people to discuss and agree on a meeting date
					</h1> */}
					<h1 className={classes.h3}>
					Get code to join a meeting
					</h1>
					<div className={classes.innerdiv}>
						<div className={classes.inputdiv}>
							<Input type="text" placeholder="Code..." width= '10rem' height='2rem' value={code} onChange={(event) => setCode(event.target.value)}/>
						</div>
						<Button title='Join A Meeting' width='10rem' height='2.8rem' color='#D4AC0D' onClick={checkCodeHandler}  />
					</div>
					<strong className={classes.strong}>{result}</strong>
				</div>
			</section>
		</div>
	)
}

export default HomeComponent;
///