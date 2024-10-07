import React from 'react';
import './Button.css';

export default function Button({
    text,
    onClick,
    type,
    reference,
    diseable
}) {
  return (
      <div>
          <button
              className='btn btn-block'
              onClick={onClick}
              type={type}
              disabled={diseable}
              id={reference}
          >{text || "Soumettre"}</button>
    </div>
  )
}
