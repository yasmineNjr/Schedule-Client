import ContextMenu from './ContextMenu';
import classes from './EventComponent.module.css';
import { useEffect, useRef, useState } from 'react';

function EventComponent(props) {
// const EventComponent = ({ source }) => props => {

    let session = props.title;
    let users = props.event.selectedPersons;
    let isCompleted 
    if(props.event.isCompleted === 'true') isCompleted = true;
    else isCompleted = false;
    // if(props.source === 'all'){
    //     session = props.title.substring(0, props.title.indexOf(":"));
    //     console.log(session);
    // }else {
    //     session = props.title;
    // }
    const contextMenuRef = useRef(null);
    const[contextMenu, setContextMenu] = useState({
        position: {
            x: 0,
            y: 0
        },
        toggled: false,
    });
    function handleOnContextMenu(e, rightClickPerson) {
        e.preventDefault();

        const contextMenuAttr= contextMenuRef.current.getBoundingClientRect();
        const isLeft= e.clientX < window?.innerWidth / 2
        let x;
        let y = e.clientY ;
        // let y = <e className='client'></e>
        if(isLeft){
            x = e.clientX;
        }else{
            x = e.clientX - contextMenuAttr.width;
        }
        setContextMenu({
            position: {
                x,
                y
            },
            toggled: true,
        })
        // console.log(contextMenuAttr);
        // console.log(rightClickPerson);   
        // console.log(x , y); 
    }
    function resetContextMenu(){
        setContextMenu({
            position: {
                x: 0,
                y: 0
            },
            toggled: false,
        });
    }
    useEffect(() => {
        function handler(e) {
            if(contextMenuRef.current){
                if(!contextMenuRef.current.contains(e.tartget)){
                    resetContextMenu();
                }
            }
        }
        document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        }
    },[]);

    return(
        <div className={classes.maindiv}
            style={isCompleted ? {color: '#810541'} :{color: 'white'} }
             onContextMenu={(e) => handleOnContextMenu(e, session)}
        >
            <p>{session}</p>
            <p>{users}</p>
            <ContextMenu 
                contextMenuRef={contextMenuRef}
                isToggled={contextMenu.toggled}
                positionX={contextMenu.position.x}
                positionY={contextMenu.position.y}
                buttons={[
                    {
                        text: "Sel",
                        icon: '',
                        onclick: ()=>alert('select'),
                        isSpacer: false,
                    },
                    {
                        text: "Del",
                        icon: '',
                        onclick: ()=>alert('delete'),
                        isSpacer: false,
                    },
                ]}
            />
        </div>
    )
}

export default EventComponent;