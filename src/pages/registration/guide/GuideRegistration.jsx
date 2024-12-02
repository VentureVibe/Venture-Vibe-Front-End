// import React, { useState } from "react";
// import "./GuideRegistration.scss";
// import RegistrationCont from "../../../components/registrationCont/RegistrationCont";
// import RegistrationPersonalInfo from "../../../components/registrationPersonalInfo/RegistrationPersonalInfo";
// import Payments from "../../../components/payments/Payments";
// import CheckOut from "../../../components/checkout/Checkout";
// import WorkExperienceForm from "../../../components/serviceProvider/WorkExperienceForm";

// const GuideRegistration = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [workExperiences, setWorkExperiences] = useState([]);

//   const [steps, setSteps] = useState([
//     {
//       step_no: "Step 1",
//       topic: "Personal Information",
//       icon: "fa-regular fa-user",
//       active: true,
//       left_cont: "Enter Your Personal Information",
//       right_cont: "Enter your personal information to proceed to the next step",
//     },
//     {
//       step_no: "Step 2",
//       topic: "Work Experience",
//       icon: "fa-solid fa-briefcase",
//       active: false,
//       left_cont: "Enter Your Work Experience",
//       right_cont: "Provide your work experience details",
//     },
//     {
//       step_no: "Step 3",
//       topic: "Check out",
//       icon: "fa-solid fa-cart-shopping",
//       active: false,
//       left_cont: "Review and Select a Plan",
//       right_cont: "Choose a plan and proceed to the payment",
//     },
//     {
//       step_no: "Step 4",
//       topic: "Payment",
//       icon: "fa-regular fa-credit-card",
//       active: false,
//       left_cont: "Enter Your Payment Details",
//       right_cont: "Complete your payment to finalize registration",
//     },
//   ]);

//   const handleStepClick = (index) => {
//     const newSteps = [...steps];
//     newSteps.forEach((step, i) => {
//       step.active = i === index;
//     });
//     setSteps(newSteps);
//   };

//   const handleNext = () => {
//     const currentIndex = steps.findIndex((step) => step.active);
//     if (currentIndex < steps.length - 1) {
//       handleStepClick(currentIndex + 1);
//     }
//   };

//   const activeStep = steps.find((step) => step.active);

//   return (
//     <div className="GuideRegistration">
//       <div className="left">
//         <div className="top">
//           <h2>{activeStep.step_no}</h2>
//           <p>{activeStep.left_cont}</p>
//         </div>
//         <div className="bottom">
//           {steps.map((step, index) => (
//             <RegistrationCont
//               key={index}
//               topic={step.topic}
//               icon={step.icon}
//               active={step.active}
//               onClick={() => handleStepClick(index)}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="right">
//         <div className="top">
//           <h3>{activeStep.topic}</h3>
//           <p>{activeStep.right_cont}</p>
//         </div>
//         <div className="bottom">
//           {activeStep.topic === "Payment" ? (
//             <Payments
//               userDetails={userDetails}
//               selectedPlan={selectedPlan}
//               workExperiences={workExperiences}
//             />
//           ) : activeStep.topic === "Check out" ? (
//             <CheckOut
//               selectedPlan={selectedPlan}
//               setSelectedPlan={setSelectedPlan}
//               onNext={handleNext}
//             />
//           ) : activeStep.topic === "Work Experience" ? (
//             <WorkExperienceForm
//               setWorkExperiences={setWorkExperiences}
//               onNext={handleNext}
//             />
//           ) : (
//             <RegistrationPersonalInfo
//               setUserDetails={setUserDetails}
//               onNext={handleNext}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuideRegistration;

import React, { useState } from "react";
import "./GuideRegistration.scss";
import RegistrationCont from "../../../components/registrationCont/RegistrationCont";
import RegistrationPersonalInfo from "../../../components/registrationPersonalInfo/RegistrationPersonalInfo";
import Payments from "../../../components/payments/Payments";
import CheckOut from "../../../components/checkout/Checkout";
import WorkExperienceForm from "../../../components/serviceProvider/WorkExperienceForm";

const GuideRegistration = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [workExperiences, setWorkExperiences] = useState([]);

  const [steps, setSteps] = useState([
    {
      step_no: "Step 1",
      topic: "Personal Information",
      icon: "fa-regular fa-user",
      active: true,
      left_cont: "Enter Your Personal Information",
      right_cont: "Enter your personal information to proceed to the next step",
    },
    {
      step_no: "Step 2",
      topic: "Work Experience",
      icon: "fa-solid fa-briefcase",
      active: false,
      left_cont: "Enter Your Work Experience",
      right_cont: "Provide your work experience details",
    },
    {
      step_no: "Step 3",
      topic: "Check out",
      icon: "fa-solid fa-cart-shopping",
      active: false,
      left_cont: "Review and Select a Plan",
      right_cont: "Choose a plan and proceed to the payment",
    },
    {
      step_no: "Step 4",
      topic: "Payment",
      icon: "fa-regular fa-credit-card",
      active: false,
      left_cont: "Enter Your Payment Details",
      right_cont: "Complete your payment to finalize registration",
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
    <div className="GuideRegistration">
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
            <Payments
              userDetails={userDetails}
              selectedPlan={selectedPlan}
              workExperiences={workExperiences}
            />
          ) : activeStep.topic === "Check out" ? (
            <CheckOut
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              onNext={handleNext}
            />
          ) : activeStep.topic === "Work Experience" ? (
            <WorkExperienceForm
              setWorkExperiences={setWorkExperiences}
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

export default GuideRegistration;
