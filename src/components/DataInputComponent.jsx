import React, { useState } from 'react'

export default function DataInputComponent({submitData, buttonText, placeholder}) {
  const [inputValue, setinputValue] = useState('');
  return (
    <React.Fragment>
      <input placeholder={placeholder} onChange={(event) => setinputValue(event.target.value)} value={inputValue}/>
      <button onClick={() => submitData(inputValue)}>{buttonText}</button>
    </React.Fragment>
  )
}
