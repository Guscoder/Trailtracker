import React from 'react';
import './optionsbutton.scss';

const OptionsButton = (props) => {
  return (
    <button type='button' className='additembutton'>
      {props.buttonText}
    </button>
  );
};

export default OptionsButton;

// const OptionsButton = (props) => {
//   return (
//     <button type='button' className='additembutton'>
//       {props.buttonText}
//     </button>
//   );
// };
