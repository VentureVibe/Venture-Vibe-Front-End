import React, { useState } from 'react'
import './RegistrationPersonalInfo.scss'

const RegistrationPersonalInfo = () => {

  const [dob, setDob] = useState({
    day: '',
    month: '',
    year: ''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setDob(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  return (
    <div className='RegistrationPersonalInfo'>
      <div className="name">
          <div className="firstname">
            <p>First Name</p>
            <input type="text" />
          </div>
          <div className="lastname">
            <p>Last Name</p>
            <input type="text" />
          </div>
      </div>
      <div className="bday">
           <p>Birth Day</p>
           <div className="input">
           <input
                    type="text"
                    name="day"
                    value={dob.day}
                    placeholder="DD"
                    maxLength="2"
                    onChange={handleChange}
                />
                <span></span>
                <input
                    type="text"
                    name="month"
                    value={dob.month}
                    placeholder="MM"
                    maxLength="2"
                    onChange={handleChange}
                />
                <span></span>
                <input
                    type="text"
                    name="year"
                    value={dob.year}
                    placeholder="YYYY"
                    maxLength="4"
                    onChange={handleChange}
                />
           </div>
         
      </div>
      <div className="contact">
          <p>Contact No</p>
          <input type="text" />
      </div>
      <div className="email">
          <p>Email </p>
           <input type="text" />
      </div>

      <div className="next">
         <button>Next</button>
      </div>
    </div>
  )
}

export default RegistrationPersonalInfo
