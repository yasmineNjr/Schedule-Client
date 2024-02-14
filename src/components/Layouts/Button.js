import classes from './Button.module.css';
function Button(props) {

    return <button className={classes.button}  
                style={{backgroundColor: props.color,
                        width: props.width,
                        height: props.height,
                        fontSize: props.fontSize,
                    }} 
                        onClick={props.onClick}>
                {props.title}
            </button>
}

export default Button;
