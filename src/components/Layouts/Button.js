import classes from './Button.module.css';
function Button(props) {

    return <button className={classes.button}  
                style={{backgroundColor: props.color,
                        width: props.width}} 
                        onClick={props.onClick}>
                {props.title}
            </button>
}

export default Button;
