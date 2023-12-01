import { gapi } from "gapi-script"

// const CLIENT_ID = process.env.CLIENT_ID ;
const CLIENT_ID = '241424108889-do9ei692opa6qr6vf58f0jjcmduttov4.apps.googleusercontent.com';
let API_KEY = "";
// const DISCOVERY_DOC = process.env.DISCOVERY_DOC ;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
// const SCOPES = process.env.SCOPES ;
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false
let gisInited = false
const google = window.google;

async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    })
    gapiInited = true
  }

  async function listUpcomingEvents(summary, location, description, dateTimeStart, dateTimeEnd, timeZone, email) {
    try {
      var event = {
        summary: summary,
        location: location,
        description: description,
        start: {
          dateTime: dateTimeStart,
          timeZone: timeZone,
        },
        end: {
          dateTime: dateTimeEnd,
          timeZone: timeZone,
        },
        recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
        attendees: [
          { email: email },
        ],
      }
    
      var request1 = gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      })

      request1.execute((event) => {
        console.log('event');
        window.open(event.htmlLink);
      })
    } catch (err) {
      console.log('err');
      return
    }
  }
export function gapiLoaded() {
    gapi.load("client", initializeGapiClient)
  }
export function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "", // defined later
    })
    gisInited = true
  }
export function handleAuthClick(summary, location, description, dateTimeStart, dateTimeEnd, timeZone, email) {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      console.log('Refresh');
      await listUpcomingEvents(summary, location, description, dateTimeStart, dateTimeEnd, timeZone, email);
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