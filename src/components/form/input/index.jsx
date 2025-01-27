import StyledInput from "./style"


const InputCountdown = ({placeholder,type,register,value, onChange}) => {
return <StyledInput placeholder={placeholder} type={type} {...register} value ={value}  onChange={ onChange} />;
}

export default InputCountdown