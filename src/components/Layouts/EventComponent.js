import classes from './EventComponent.module.css';

function EventComponent(props) {

    let session = props.title;
    let users = props.event.selectedPersons;

    // if(props.source === 'all'){
    //     session = props.title.substring(0, props.title.indexOf(":"));
    //     console.log(session);
    // }else {
    //     session = props.title;
    // }

    return(
        <div className={classes.maindiv}>
            <p>{session}</p>
            <p>{users}</p>
        </div>
    )
}

export default EventComponent;