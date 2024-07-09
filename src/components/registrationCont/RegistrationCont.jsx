import React from 'react'
import './RegistrationCont.scss'

const RegistrationCont = ({ topic, icon, active, onClick }) => {
    return (
        <div className="RegistrationCont">
            <div className={`cont ${active ? 'active' : ''}`} onClick={onClick}>
            <h3>{topic}</h3>
            <div className={active ? "circle" : "circle2"}>
                <i className={icon}></i>
            </div>
            <div className={active ? "dot" : "dot1"}></div>
        </div>
        </div>
     
    );
}

export default RegistrationCont
