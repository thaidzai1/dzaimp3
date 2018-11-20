import React from 'react'

const TextBox = props => {
  const { type, name, labelName, classname, handleOnChange} = props;
  return (
    <div className='input-group'>
      <input
        type={type} name={name} className={classname !== '' ? classname : '' } required
        onChange={handleOnChange}
      ></input>
      <label className='label-username'>{labelName}</label>
    </div>
  )
}

export default TextBox
