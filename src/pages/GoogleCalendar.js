import { useEffect } from 'react';
import { gapi } from "gapi-script"

function GoogleCalendar() {

    // const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_ID = '241424108889-do9ei692opa6qr6vf58f0jjcmduttov4.apps.googleusercontent.com';
    let API_KEY = "";
    // const API_KEY = process.env.REACT_APP_API_KEY;
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const SCOPES = "https://www.googleapis.com/auth/calendar";

    let tokenClient;
    let gapiInited = false
    let gisInited = false
    const google = window.google;
  
    function gapiLoaded() {
        gapi.load("client", initializeGapiClient)
      }
    
      /**
       * Callback after the API client is loaded. Loads the
       * discovery doc to initialize the API.
       */
      async function initializeGapiClient() {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        })
        gapiInited = true
        maybeEnableButtons()
      }
    
      function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: "", // defined later
        })
        gisInited = true
        maybeEnableButtons()
      }
    
      /**
       * Enables user interaction after all libraries are loaded.
       */
      function maybeEnableButtons() {
        if (gapiInited && gisInited) {
        }
      }
    
      function handleAuthClick() {
        tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
            throw resp;
            // console.log(resp);
          }
          document.getElementById("signout_button").style.visibility = "visible"
          //document.getElementById("authorize_button").innerText = "Refresh"
          console.log('Refresh');
          await listUpcomingEvents()
        }
    
        if (gapi?.client?.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          tokenClient.requestAccessToken({ prompt: "consent" })
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          tokenClient.requestAccessToken({ prompt: "" })
        }
      }

      function handleSignoutClick() {
        const token = gapi?.client?.getToken()
        if (token !== null) {
          google.accounts.oauth2.revoke(token?.access_token)
          gapi?.client?.setToken("")
    
          // document.getElementById('authorize_button').innerText = 'Authorize';
          // document.getElementById('signout_button').style.visibility = 'hidden';
        }
      }

      async function listUpcomingEvents() {
        let response
        try {
          const request = {
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
          }
          response = await gapi.client.calendar.events.list(request)
    
          var event = {
            summary: "Fantastic Event!",
            location: "800 Howard St., San Francisco, CAAAA 94103",
            description: "Really great refreshmentssssssssssss",
            start: {
              dateTime: "2023-11-20T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: "2023-11-25T17:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              { email: "yasmine.alnajar@gmail.com" },
              { email: "yasmine.alnajar@gmail.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          }
    
          var request1 = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          })
    
          request1.execute((event) => {
            console.log('event')
            window.open(event.htmlLink)
          })
        } catch (err) {
        //   document.getElementById("content").innerText = err.message
          console.log('err');
          return
        }
    
        const events = response.result.items
        if (!events || events.length === 0) {
        //   document.getElementById("content").innerText = "No events found."
          console.log('No events found.');
          return
        }
        // Flatten to string to display
        const output = events.reduce(
          (str, event) =>
            `${str}${event.summary} (${
              event.start.dateTime || event.start.date
            })\n`,
          "Events:\n"
        )
        // document.getElementById("content").innerText = output
        console.log(output);
      }

      useEffect(() => {
        gapiLoaded()
        gisLoaded()
      }, [])
    return(
        <div>
            <button id="authorize_button" onClick={handleAuthClick}>
            Authorize
            </button>
            <button id="signout_button" onClick={handleSignoutClick}>
            Sign Out
            </button>
        </div>
    );
}

export default GoogleCalendar;