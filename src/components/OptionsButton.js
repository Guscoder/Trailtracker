import React from 'react';
import './additembutton.css';

const OptionsButton = (props) => {
  return (
    <button type='button' className='additembutton'>
      {props.buttonText}
    </button>
  );
};

export default OptionsButton;
