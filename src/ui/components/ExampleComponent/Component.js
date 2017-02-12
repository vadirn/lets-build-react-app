import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';

const ExampleComponent = (props) => {
  const {
    isOn,
    toggleButton,
  } = props;
  return (
    <button styleName={`button ${isOn ? 'on' : 'off'}`} type='button' onClick={toggleButton}>{isOn ? 'On' : 'Off'}</button>
  );
};

export default CSSModules(ExampleComponent, styles, { allowMultiple: true });
