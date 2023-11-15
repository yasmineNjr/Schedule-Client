import { gapi } from "gapi-script";

// let gapi = window.gapi;
let CLIENT_ID = "241424108889-do9ei692opa6qr6vf58f0jjcmduttov4.apps.googleusercontent.com";
let API_KEY = "AIzaSyC1tAJASw4H6w-pbVzcVUUOKBFwGPzY0zo";
let DISCOVERY_DOCS=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
let SCOPES = "https://www.googleapis.com/auth/calendar.events";

const addCalendarEvent = (timeString,address,clientName) => {
  
      window.gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      let timeZone = "Asia/Jerusalem"; 
      let duration = '00:30:00'; //duration of each event, here 30 minuts

    //event start time - im passing datepicker time, and making it match      
    //with the duration time, you can just put iso strings:
    //2020-06-28T09:00:00-07:00' 

     let startDate = new Date(timeString);
      let msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60  + Number(duration.split(':')[2])) * 1000;
      let endDate = new Date(startDate.getTime() + msDuration);
      let isoStartDate = new Date(startDate.getTime()-new Date().getTimezoneOffset()*60*1000).toISOString().split(".")[0];
      let isoEndDate = new Date(endDate.getTime()-(new Date().getTimezoneOffset())*60*1000).toISOString().split(".")[0];


    //sign in with pop up window
      gapi.auth2.getAuthInstance().signIn()
      .then(() => { 
        let event = {
          'summary': clientName, // or event name
          'location': address, //where it would happen
          'start': {
            'dateTime': isoStartDate,
            'timeZone': timeZone
          },
          'end': {
            'dateTime': isoEndDate,
            'timeZone': timeZone
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1' 
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'popup', 'minutes': 20}
            ]
          }
        }
         
        //if you need to list your events than keep it
         gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        
        //end of event listing
       
        let request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })


        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        


      })
    })

    // async function createCalendarEvent() {

    //   let start = new Date(timeString);
    //   let duration = '00:30:00';
    //   let msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60  + Number(duration.split(':')[2])) * 1000;
    //   let end = new Date(start.getTime() + msDuration);


    //   console.log("Creating calendar event");
    //   const event = {
    //     'summary': 'eventName',
    //     'description': 'eventDescription',
    //     'start': {
    //       'dateTime': start.toISOString(), // Date.toISOString() ->
    //       'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
    //     },
    //     'end': {
    //       'dateTime': end.toISOString(), // Date.toISOString() ->
    //       'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
    //     }
    //   }
    //   await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    //     method: "POST",
    //     headers: {
    //       'Authorization':'Bearer ' + session.provider_token // Access token for google
    //     },
    //     body: JSON.stringify(event)
    //   }).then((data) => {
    //     return data.json();
    //   }).then((data) => {
    //     console.log(data);
    //     alert("Event created, check your Google Calendar!");
    //   });
    // }

  }
export default addCalendarEvent;