import React, {useState} from "react";
import { useContext } from "react";
import AppContext from "../AppContext";
import Input from "../components/Layouts/Input";
import Button from "../components/Layouts/Button";

function LogIn() {
    
    const value = useContext(AppContext);

    const [enteredEmail, setEnteredEmail]     = useState('');
    const [enteredName, setEnteredName]       = useState('');
    const [result, setResult]                 = useState('');

    function loginHandler(event) {
        event.preventDefault();
        value.setGlobalName(enteredName);
        value.setGlobalGmail(enteredEmail);
        localStorage.setItem('Name', enteredName);
        localStorage.setItem('Email', enteredEmail);
        setResult('You loged in') ;
    }

    return  (
        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#FBFCFC', height: 565}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',borderRadius: '12px', border: '2px solid #1B4F72', width: '30rem', height: '18rem', marginTop: '3rem'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'}}>
                    <label style={{ width: '9rem'}} htmlFor='email'><strong style={{color: '#1B4F72', fontSize: '1.2rem', marginRight: '1rem'}}>YOUR MAIL</strong></label>
                    <Input type='email' 
                        id='email' 
                        required 
                        value={enteredEmail} 
                        onChange={event => setEnteredEmail(event.target.value)} />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'}}>
                    <label style={{ width: '9rem'}} htmlFor='name'><strong style={{color: '#1B4F72', fontSize: '1.2rem', marginRight: '1rem'}}>YOUR NAME</strong></label>
                    <Input type='text' 
                            id='name' 
                            required
                            value={enteredName} 
                             onChange={event => setEnteredName(event.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                    <Button title='Log In' color='#512E5F' width='21.5rem' onClick={loginHandler}/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                    <strong style={{color: '#1B4F72', fontSize: '1.2rem'}}>{result}</strong>
                </div>
            </div>
        </div>
    )
}

export default LogIn;

