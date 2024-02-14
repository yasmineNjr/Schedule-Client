// import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import AllMeetings from './pages/AllMeetings';
import NewMeeting from './pages/NewMeeting';
import DiscussMeeting from './pages/DiscussMeeting';
import LogIn from './pages/LogIn';
import GoogleCalendar from './pages/GoogleCalendar';
import Layout from './components/Layout';
import AppContext from './AppContext';

function App() {

  const [globalMessage, setGlobalMessage] = useState([]);
  const [finalMessage, setFinalMessage] = useState([]);
  const [globalName, setGlobalName] = useState('');
  const [globalGmail, setGlobalGmail] = useState('');

  return (
     <BrowserRouter >
        <AppContext.Provider
            value={{
              state: {
                globalMessage: globalMessage,
                finalMessage : finalMessage,
                globalName   : globalName,
                globalGmail  : globalGmail,
              },
              setGlobalMessage: setGlobalMessage,
              setFinalMessage : setFinalMessage,
              setGlobalName   : setGlobalName,
              setGlobalGmail  : setGlobalGmail,
            }}
          >
            <Layout>
              <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/AllMeetings" element={<AllMeetings/>} />
                <Route exact path="/NewMeeting" element={<NewMeeting/>} />
                {/* <Route exact path="/DiscussMeeting/:message" element={<DiscussMeeting/>} /> */}
                <Route exact path="/DiscussMeeting" element={<DiscussMeeting/>} />
                <Route exact path="/LogIn" element={<LogIn/>} />
                <Route exact path="/GoogleCalendar" element={<GoogleCalendar/>} />
              </Routes>
            </Layout>
          </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;

        
     