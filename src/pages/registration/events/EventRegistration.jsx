import React, { useState } from 'react';
import './EventRegistration.scss';
import  RegistrationCont from '../../../components/registrationCont/RegistrationCont'
const EventRegistration = () => {
    const [steps, setSteps] = useState([
        { topic: "Personal Infomation", icon: "fa-regular fa-user", active: true },
        { topic: "Payment", icon: "fa-regular fa-credit-card", active: false }    
    ]);

    const handleStepClick = (index) => {
        const newSteps = [...steps];
        newSteps.forEach((step, i) => {
            if (i === index) {
                step.active = true;
            } else {
                step.active = false;
            }
        });
        setSteps(newSteps);
    };

    return (
        <div className='EventRegistration'>
            <div className="left">
                <div className="top">
                    <h2>Step 1</h2>
                    <p>Enter Your Personal Information</p>
                </div>
                <div className="bottom">
                    {steps.map((step, index) => (
                        <RegistrationCont
                            key={index}
                            topic={step.topic}
                            icon={step.icon}
                            active={step.active}
                            onClick={() => handleStepClick(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <h3>Personal Information</h3>
                    <p>Enter your Personal information to proceed to the payments
                        
                    </p>
                    <p></p>
                </div>
                <div className="bottom"></div>
            </div>
        </div>
    );
};


export default EventRegistration;
