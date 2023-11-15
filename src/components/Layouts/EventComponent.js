function EventComponent(props) {
    //console.log(props.event.selectedPersons);
    let title = props.title;
    let persons = props.event.selectedPersons;

    // if(props.event.selectedPersons.length > 0){
    //     title += " : ";
    //     persons = props.event.selectedPersons[0];
    // }
    // let selected = props.event.selectedPersons;
    // selected.pop(props.event.selectedPersons[0]);
    // if(selected.length > 0){
    //     selected.map( person => {
    //         let p = ' - '+ person;
    //         persons += p;
    //         }
    //     )
    // }
    
    return(
        <div style={{display: 'flex', flexDirection: 'row', height: '1.3rem', margin: '0', padding: '0', alignItems: 'center', justifyContent: 'center'}}>
            <p>{title}</p>
            <p>{persons}</p>
            
        </div>
    )
}

export default EventComponent;