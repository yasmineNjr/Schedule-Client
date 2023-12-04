import classes from './ContextMenu.module.css';
import {AiFillDelete} from 'react-icons/ai';
import { AiOutlineSelect } from "react-icons/ai";

function ContextMenu({
                rightClickItem,
                positionX,
                positionY,
                isToggled,
                buttons,
                contextMenuRef
            }) {
    return (
        <menu
            className={classes.contextmenu}
            style={{
                top : positionY - 140 + 'px',
                left: positionX + 7 + 'px',
                visibility: isToggled ? 'visible' : 'hidden',
                opacity:  isToggled ? '1' : '0',
                display: 'flex',
                flexDirection: 'row',
            }}
            ref={contextMenuRef}
        >
          {
            // buttons.map((button, index) => {
            //     function handleClick(e) {
            //         e.stopPropagation();
            //         button.onClick(e, rightClickItem)
            //     }
            //     if(button.isSpacer) return <hr className={classes.contextmenuhr} key={index}></hr>
            //     return (
            //         <button key={index}
            //                 onClick={handleClick}
            //                 className={classes.contextmenubutton}
            //         >
            //             <span>{button.text}</span>
            //             {/* <span className={classes.contextmenuicon}>{button.icon}</span> */}
            //         </button>
            //     )
            //     }
            // )
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <button className={classes.contextmenubutton} >
                    <span><AiOutlineSelect color='#512E5F' onClick={()=>console.log('sel')}/></span>
                </button>
                <button className={classes.contextmenubutton} >
                    <span><AiFillDelete color='#810541' onClick={()=>console.log('delete')}/></span>
                </button>
            </div>
            
          }  
        </menu>
    );
}

export default ContextMenu;