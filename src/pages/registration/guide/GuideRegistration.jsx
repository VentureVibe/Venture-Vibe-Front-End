import React, { useState } from 'react';
import './GuideRegistration.scss';
import RegistrationCont from '../../../components/registrationCont/RegistrationCont';
import RegistrationPersonalInfo from '../../../components/registrationPersonalInfo/RegistrationPersonalInfo';
import Payments from '../../../components/payments/Payments';
import CheckOut from '../../../components/checkout/Checkout';

const GuideRegistration = () => {
    const [steps, setSteps] = useState([
        { step_no: "Step 1", topic: "Personal Information", icon: "fa-regular fa-user", active: true, left_cont: "Enter Your Personal Information", right_cont: "Enter your Personal information to proceed to the payments" },
        { step_no: "Step 2", topic: "Work Experience", icon: "fa-solid fa-briefcase", active: false, left_cont: "Enter Your Work Experience", right_cont: "Provide your work experience details" },
        { step_no: "Step 3", topic: "Check out", icon: "fa-solid fa-cart-shopping", active: false, left_cont: "This is the details of your payment", right_cont: "Proceed to payments to do the payment" },
        { step_no: "Step 4", topic: "Payment", icon: "fa-regular fa-credit-card", active: false, left_cont: "Enter Your Payment Details", right_cont: "Enter your payment details to proceed to the payment" }
    ]);

    const handleStepClick = (index) => {
        const newSteps = [...steps];
        newSteps.forEach((step, i) => {
            step.active = i === index;
        });
        setSteps(newSteps);
    };

    const activeStep = steps.find(step => step.active);

    return (
        <div className='GuideRegistration'>
            <div className="left">
                <div className="top">
                    <h2>{activeStep.step_no}</h2>
                    <p>{activeStep.left_cont}</p>
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
                    <h3>{activeStep.topic}</h3>
                    <p>{activeStep.right_cont}</p>
                </div>
                <div className="bottom">
                    {activeStep.topic === 'Payment' ? <Payments /> :
                     activeStep.topic === 'Check out' ? <CheckOut /> :
                     activeStep.topic === 'Work Experience' ? <div>Work Experience Form</div> :
                     <RegistrationPersonalInfo />}
                </div>
            </div>
        </div>
    );
};

export default GuideRegistration;
