import classes from './Button.module.css';
function Button(props) {

    return <button className={classes.button}  
                style={{backgroundColor: props.color,
                        height: '2rem',
                        width: props.width,
                        color: '#FBFCFC ',
                        border: 'none',
                        borderRadius: '6px', 
                        // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        boxShadow: '0 3px rgba(0, 0, 0, 0.2)',
                        marginBottom: '0.25rem',
                        cursor: 'pointer'}} 
                    onClick={props.onClick}>
                {props.title}
            </button>
}

export default Button;
// className={classes.button} style={{backgroundColor: props.color, boxShadow: '0 3px rgba(0, 0, 0, 0.2)',}}
