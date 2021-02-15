import React from 'react'
import './Input.css'

const Input = ({register, error, label,text,checkbox,value, ...inputProps})=>{
    return (
        <div className="input">
             <label>
                 <span className="input__name">{label}</span>
                 <div className={`${text && 'input__input'} ${checkbox && 'checkbox'} ${error && 'error'}`}>
                    <input 
                      ref={register}
                      {...inputProps}
                    />
                      {error &&  <p className="input__error">{error.message}</p>}
                      {checkbox && <span>{value}</span>} 
                 </div> 
                 {text && <span className="input__text">{text}</span>}
               </label>
        </div>
    )
}
export default Input
