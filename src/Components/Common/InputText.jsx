import React from 'react'

const InputText = (props) => {
    return (  
  <div className="form-groupp">
    <input
     className="form-control"
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder} 
    />
  </div>
)
}

export default InputText;