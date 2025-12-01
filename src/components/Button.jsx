import React from 'react'

export default function Button({text, handleClick, disabled = false}) {
  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!disabled && handleClick) {
      handleClick();
    }
  };

  return (
    <a 
      href="#" 
      className={`f5 no-underline inline-flex items-center pa3 ba border-box mr4 ${
        disabled 
          ? 'gray bg-light-gray o-50 pointer-events-none' 
          : 'black bg-animate hover-bg-black hover-white pointer'
      }`}
      onClick={handleButtonClick}
    >
      <span className="pl1">{text}</span>
    </a>
  )
}
