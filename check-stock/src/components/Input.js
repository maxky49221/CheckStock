import React from 'react'

const Input = ({name, onChange, type}) => {
    return (
        <div>
            <div className="mb-3">
                  <label className="form-label" for="Serial">
                    {name}
                  </label>
                  <input className="form-control" onChange={onChange}
                    type= {type}
                  ></input>
                </div>
        </div>
    )
}

export default Input;
