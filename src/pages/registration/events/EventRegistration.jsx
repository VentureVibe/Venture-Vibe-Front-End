import React, { useState } from "react";
import "./EventRegistration.scss";
import RegistrationCont from "../../../components/registrationCont/RegistrationCont";
import RegistrationPersonalInfo from "../../../components/registrationPersonalInfo/RegistrationPersonalInfo";
import Payments from "../../../components/payments/Payments";
import CheckOut from "../../../components/checkout/Checkout";

const EventRegistration = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [steps, setSteps] = useState([
    {
      step_no: "Step 1",
      topic: "Personal Information",
      icon: "fa-regular fa-user",
      active: true,
      left_cont: "Enter Your Personal Information",
      right_cont: "Enter your personal information to proceed to the payments",
    },
    {
      step_no: "Step 2",
      topic: "Check out",
      icon: "fa-solid fa-cart-shopping",
      active: false,
      left_cont: "This is the details of your plan",
      right_cont: "Select a plan to proceed to the payments",
    },
    {
      step_no: "Step 3",
      topic: "Payment",
      icon: "fa-regular fa-credit-card",
      active: false,
      left_cont: "Enter Your Payment Details",
      right_cont: "Enter your payment details to proceed with the payment",
    },
  ]);

  const handleStepClick = (index) => {
    const newSteps = [...steps];
    newSteps.forEach((step, i) => {
      step.active = i === index;
    });
    setSteps(newSteps);
  };

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.active);
    if (currentIndex < steps.length - 1) {
      handleStepClick(currentIndex + 1);
    }
  };

  const activeStep = steps.find((step) => step.active);

  return (
    <div className="EventRegistration">
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
          {activeStep.topic === "Payment" ? (
            <Payments userDetails={userDetails} selectedPlan={selectedPlan} />
          ) : activeStep.topic === "Check out" ? (
            <CheckOut
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              onNext={handleNext}
            />
          ) : (
            <RegistrationPersonalInfo
              setUserDetails={setUserDetails}
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
