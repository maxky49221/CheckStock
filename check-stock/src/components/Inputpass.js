import React from 'react'

const Inputpass = ({name}) => {
    return (
        <div>
            <div className="mb-3">
                  <label className="form-label" for="Serial">
                    {name}
                  </label>
                  <input className="form-control"
                    type= "password"
                  ></input>
                </div>
        </div>
    )
}

export default Inputpass
