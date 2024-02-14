import classes from './Input.module.css';

function Input(props) {

    return <input   className={classes.input}
                    style={{width: props.width, height: props.height}}
                    type={props.type} 
                    placeholder={props.placeholder}
                    value={props.value} 
                    onChange={props.onChange} 
            />
}
export default Input;