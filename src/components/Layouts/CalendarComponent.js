import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventComponent from "./EventComponent";

const locales = {
	"en-US": require("date-fns/locale/en-US"),
  };
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
  })

function CalendarComponent(props){
	
    return(
		props.source === 'all'
		?
		<Calendar  
			localizer={localizer} 
			events={props.events} 
			startAccessor="start" 
			endAccessor="end" 
			style={{ height: 500, backgroundColor: 'white', width: '90%', margin: '2rem' }} 
			/>
		:
		<Calendar  
				localizer={localizer} 
				events={props.events} 
				startAccessor="start" 
				endAccessor="end" 
				components={{
					// event: () => <EventComponent source='x'/>
					event: EventComponent 
				}}
				onSelectEvent={props.onSelectEvent}
				onKeyPressEvent={props.onKeyPressEvent}
				onDoubleClickEvent={props.onDoubleClickEvent}
				style={{ height: 500, backgroundColor: 'white', width: '90%', margin: '2rem' }} 
			/>
    );
}

export default CalendarComponent;