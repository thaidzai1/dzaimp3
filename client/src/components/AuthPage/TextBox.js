import React from 'react'

const TextBox = props => {
  const { type, name, labelName} = props;
  return (
    <div className='input-group'>
      <input type={type} name={name} required></input>
      <label className='label-username'>{labelName}</label>
    </div>
  )
}

export default TextBox
