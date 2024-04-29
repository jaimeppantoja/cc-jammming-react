import React from 'react';
import Style from './Button.module.css'

const Button = ({name, onClick}) => {
  const eventHandler =(event)=>{
    onClick(event.target.value)
  }
  return (
    <button className={Style.button} onClick={eventHandler}>{name}</button>
  )
}

export default Button