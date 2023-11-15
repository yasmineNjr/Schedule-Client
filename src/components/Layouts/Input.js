import classes from './Input.module.css';

function Input(props) {

    return <input   type={props.type} 
                    placeholder={props.placeholder}
                    value={props.value} 
                    onChange={props.onChange} 
                    style={{font: 'inherit', 
                            borderRadius: '6px', 
                            border: '1px solid gray', 
                            marginBottom: '0.25rem',
                            padding: '5px',
                            color: '#1B4F72',
                            outline: 'none'}}
            />
}
export default Input;