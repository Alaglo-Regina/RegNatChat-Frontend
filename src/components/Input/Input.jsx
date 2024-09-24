import React from 'react'
import './Input.css'

export default function Input(
  {
    type, 
    value,
    placeholder,
    onChange,
    label,
    reference
    }
) {
  return (
    <div>
          <label htmlFor={reference}>{label}</label>
          <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              id={reference}
          />
    </div>
  )
}
