import React, {useState} from "react";
import { useContext } from "react";
import AppContext from "../../AppContext";
import Input from "../Layouts/Input";
import Button from "../Layouts/Button";
import classes from './LogInComponent.module.css'

function LogInComponent() {
    
    const value = useContext(AppContext);

    const [enteredEmail, setEnteredEmail]     = useState('');
    const [enteredName, setEnteredName]       = useState('');
    const [result, setResult]                 = useState('');

    function loginHandler(event) {
        event.preventDefault();
        if(!enteredEmail.includes('@gmail')){
            setResult('Check your gmail') ;
        }else{
            value.setGlobalName(enteredName);
            value.setGlobalGmail(enteredEmail);
            localStorage.setItem('Name', enteredName);
            localStorage.setItem('Email', enteredEmail);
            setResult('You loged in') ;
        }
        
    }

    return  (
        <div className={classes.maindiv}>
            <div className={classes.subdiv}>
                <div className={classes.inputdiv}>
                    <label className={classes.lbl} htmlFor='email'>
                        <strong className={classes.str} >YOUR MAIL</strong>
                    </label>
                    <Input type='email' 
                        id='email' 
                        required 
                        value={enteredEmail} 
                        width= '20rem'
                        onChange={event => setEnteredEmail(event.target.value)} />
                </div>
                <div className={classes.inputdiv}>
                    <label className={classes.lbl} htmlFor='name'>
                        <strong className={classes.str} >YOUR NAME</strong>
                    </label>
                    <Input type='text' 
                            id='name' 
                            required
                            value={enteredName} 
                            width= '20rem'
                            onChange={event => setEnteredName(event.target.value)} />
                </div>
                <div className={classes.btndiv} >
                    <Button title='Log In' color='#512E5F' width='21.5rem' onClick={loginHandler}/>
                </div>
                <div className={classes.btndiv} >
                    <strong className={classes.result}>{result}</strong>
                </div>
            </div>
        </div>
    )
}

export default LogInComponent;

