// import React, { useEffect, useState } from "react";
// import "./payment.scss";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { GetCurrentUserC } from "../../services/user/GetCurrentUserC";
// import { GetUser } from "../../services/user/GetUser";

// const Payments = ({ userDetails, selectedPlan, workExperiences }) => {
//   const [orderId, setOrderId] = useState("");
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [res, setRes] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!window.payhere) {
//       console.error("PayHere library is not loaded");
//       return;
//     }
//     console.log("User Details : ", userDetails);
//     console.log("Selected Plan : ", selectedPlan);
//     if (workExperiences) {
//       console.log("Work Experience : ", workExperiences.experiences);
//       console.log("Languages : ", workExperiences.languages);
//       console.log("Specialties : ", workExperiences.specialties);
//     }
//   }, [selectedPlan, workExperiences]);

//   const handlePayment = async () => {
//     if (!window.payhere) {
//       console.error("PayHere library is not loaded");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/payment/generateHash",
//         {
//           amount: selectedPlan === "annual" ? 500.0 : 50.0,
//           currency: "USD",
//         }
//       );

//       const data = response.data;
//       console.log("Response data:", data);

//       setRes(data);
//       setOrderId(data.orderId);

//       const payment = {
//         sandbox: true,
//         merchant_id: import.meta.env.VITE_MERCHANT_ID,
//         return_url: `http://localhost:5173`,
//         cancel_url: `http://localhost:5173`,
//         notify_url: "",
//         order_id: data.orderId,
//         items: "Event Registration",
//         amount: selectedPlan === "annual" ? "500.00" : "50.00",
//         currency: "USD",
//         hash: data.hash,
//         first_name: userDetails.firstName,
//         last_name: userDetails.lastName,
//         email: userDetails.email,
//         phone: userDetails.contactNumber,
//         address: "",
//         city: "",
//         country: "",
//       };

//       window.payhere.onCompleted = async function onCompleted(orderId) {
//         setPaymentSuccess(true);
//         console.log("Payment success:", orderId);

//         const decodedToken = GetCurrentUserC();
//         const purchaseDate = new Date();
//         let expirationDate;

//         if (selectedPlan === "annual") {
//           expirationDate = new Date(
//             new Date().setFullYear(new Date().getFullYear() + 1)
//           );
//         } else {
//           expirationDate = new Date(
//             new Date().setMonth(new Date().getMonth() + 1)
//           );
//         }

//         try {
//           const user = await GetUser();
//           console.log("User: ", user);

//           const serviceProviderDetails = {
//             id: decodedToken.sub,
//             role:
//               (user.role == "TravelGuide" && !workExperiences) ||
//               (user.role == "EventPlanner" && workExperiences)
//                 ? "TravelGuide_EventPlanner"
//                 : workExperiences
//                 ? "TravelGuide"
//                 : "EventPlanner",
//             purchaseDate: purchaseDate.toISOString(),
//             expirationDate: expirationDate.toISOString(),
//             planType: selectedPlan,
//             contactNumber: userDetails.contactNumber,
//             email: userDetails.email,
//             sp_lat: userDetails.location.lat,
//             sp_lng: userDetails.location.lng,
//           };

//           // Check if workExperiences is defined
//           // const endpoint = workExperiences
//           //   ? "http://localhost:8080/api/v1/serviceProvider/add-travel-guide"
//           //   : "http://localhost:8080/api/v1/serviceProvider/add-event-planner";

//           const endpoint =
//             !workExperiences && user.role === "TravelGuide"
//               ? "http://localhost:8080/api/v1/serviceProvider/update-travel-guide"
//               : workExperiences && user.role === "EventPlanner"
//               ? "http://localhost:8080/api/v1/serviceProvider/add-service-provider"
//               : workExperiences
//               ? "http://localhost:8080/api/v1/serviceProvider/add-travel-guide"
//               : "http://localhost:8080/api/v1/serviceProvider/add-event-planner";

//           // const result = await axios.post(endpoint, {
//           //   ...serviceProviderDetails,
//           //   workExperience: workExperiences,
//           //   radius: userDetails.radius,
//           // });

//           const result =
//             !workExperiences && user.role === "TravelGuide"
//               ? await axios.put(endpoint, {
//                   ...serviceProviderDetails,
//                 })
//               : !workExperiences && user.role === "Traveler"
//               ? await axios.post(endpoint, {
//                   ...serviceProviderDetails,
//                 })
//               : await axios.post(endpoint, {
//                   ...serviceProviderDetails,
//                   workExperience: workExperiences.experiences,
//                   radius: userDetails.radius,
//                   specialties: workExperiences.specialties,
//                   languages: workExperiences.languages,
//                 });

//           const result2 = await axios.put(
//             `http://localhost:8080/api/v1/public/traveler/${decodedToken.sub}`,
//             {
//               firstName: userDetails.firstName,
//               lastName: userDetails.lastName,
//               role:
//                 (user.role == "TravelGuide" && !workExperiences) ||
//                 (user.role == "EventPlanner" && workExperiences)
//                   ? "TravelGuide_EventPlanner"
//                   : workExperiences
//                   ? "TravelGuide"
//                   : "EventPlanner",
//             }
//           );

//           console.log("Service provider stored successfully:", result.data);
//           console.log("Service provider stored successfully:", result2.data);
//           navigate("/");
//           window.location.reload();
//         } catch (error) {
//           console.error("Error storing service provider details:", error);
//         }
//       };

//       window.payhere.onDismissed = function onDismissed() {
//         console.log("Payment dismissed");
//       };

//       window.payhere.onError = function onError(error) {
//         console.error("Payment error:", error);
//       };

//       window.payhere.startPayment(payment);
//     } catch (error) {
//       console.error("Error fetching hash:", error);
//     }
//   };

//   return (
//     <div className="Payments">
//       <div className="button">
//         <button onClick={handlePayment}>Pay now</button>
//       </div>
//     </div>
//   );
// };

// export default Payments;

import React, { useEffect, useState } from "react";
import "./payment.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetCurrentUserC } from "../../services/user/GetCurrentUserC";
import { GetUser } from "../../services/user/GetUser";

const Payments = ({ userDetails, selectedPlan, workExperiences }) => {
  const [orderId, setOrderId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [res, setRes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.payhere) {
      console.error("PayHere library is not loaded");
      return;
    }
    console.log("User Details : ", userDetails);
    console.log("Selected Plan : ", selectedPlan);
    if (workExperiences) {
      console.log("Work Experience : ", workExperiences.experiences);
      console.log("Languages : ", workExperiences.languages);
      console.log("Specialties : ", workExperiences.specialties);
      console.log("Price Per Day : ", workExperiences.pricePerDay);
    }
  }, [selectedPlan, workExperiences]);

  const handlePayment = async () => {
    if (!window.payhere) {
      console.error("PayHere library is not loaded");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/payment/generateHash",
        {
          amount: selectedPlan === "annual" ? 500.0 : 50.0,
          currency: "USD",
        }
      );

      const data = response.data;
      console.log("Response data:", data);

      setRes(data);
      setOrderId(data.orderId);

      const payment = {
        sandbox: true,
        merchant_id: import.meta.env.VITE_MERCHANT_ID,
        return_url: `http://localhost:5173`,
        cancel_url: `http://localhost:5173`,
        notify_url: "",
        order_id: data.orderId,
        items: "Event Registration",
        amount: selectedPlan === "annual" ? "500.00" : "50.00",
        currency: "USD",
        hash: data.hash,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.contactNumber,
        address: "",
        city: "",
        country: "",
      };

      window.payhere.onCompleted = async function onCompleted(orderId) {
        setPaymentSuccess(true);
        console.log("Payment success:", orderId);

        const decodedToken = GetCurrentUserC();
        const purchaseDate = new Date();
        let expirationDate;

        if (selectedPlan === "annual") {
          expirationDate = new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          );
        } else {
          expirationDate = new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          );
        }

        try {
          const user = await GetUser();
          console.log("User: ", user);

          const serviceProviderDetails = {
            id: decodedToken.sub,
            role:
              (user.role == "TravelGuide" && !workExperiences) ||
              (user.role == "EventPlanner" && workExperiences)
                ? "TravelGuide_EventPlanner"
                : workExperiences
                ? "TravelGuide"
                : "EventPlanner",
            purchaseDate: purchaseDate.toISOString(),
            expirationDate: expirationDate.toISOString(),
            planType: selectedPlan,
            contactNumber: userDetails.contactNumber,
            email: userDetails.email,
            sp_lat: userDetails.location.lat,
            sp_lng: userDetails.location.lng,
          };

          const endpoint =
            !workExperiences && user.role === "TravelGuide"
              ? "http://localhost:8080/api/v1/serviceProvider/update-travel-guide"
              : workExperiences && user.role === "EventPlanner"
              ? "http://localhost:8080/api/v1/serviceProvider/add-service-provider"
              : workExperiences
              ? "http://localhost:8080/api/v1/serviceProvider/add-travel-guide"
              : "http://localhost:8080/api/v1/serviceProvider/add-event-planner";

          const result =
            !workExperiences && user.role === "TravelGuide"
              ? await axios.put(endpoint, {
                  ...serviceProviderDetails,
                })
              : !workExperiences && user.role === "Traveler"
              ? await axios.post(endpoint, {
                  ...serviceProviderDetails,
                })
              : await axios.post(endpoint, {
                  ...serviceProviderDetails,
                  workExperience: workExperiences.experiences,
                  radius: userDetails.radius,
                  specialties: workExperiences.specialties,
                  languages: workExperiences.languages,
                  price: workExperiences.pricePerDay,
                });

          const result2 = await axios.put(
            `http://localhost:8080/api/v1/public/traveler/${decodedToken.sub}`,
            {
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              role:
                (user.role == "TravelGuide" && !workExperiences) ||
                (user.role == "EventPlanner" && workExperiences)
                  ? "TravelGuide_EventPlanner"
                  : workExperiences
                  ? "TravelGuide"
                  : "EventPlanner",
            }
          );

          const paymentDetails = {
            sender: userDetails.id,
            dateTime: new Date().toISOString(),
            amount: selectedPlan === "annual" ? "500.00" : "50.00",
            category: "Registration_Fee",
          };

          try {
            const paymentResponse = await axios.post(
              "http://localhost:8080/api/v1/payment/store",
              paymentDetails
            );
            if (paymentResponse.status === 200) {
              console.log("Payment details stored successfully:");
              //alert("Payment details stored successfully!");
            }
          } catch (error) {
            console.error("Error storing payment details:", error);
            //alert("Failed to store payment details.");
          }

          console.log("Service provider stored successfully:", result.data);
          console.log("Service provider stored successfully:", result2.data);
          navigate("/");
          window.location.reload();
        } catch (error) {
          console.error("Error storing service provider details:", error);
        }
      };

      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
      };

      window.payhere.onError = function onError(error) {
        console.error("Payment error:", error);
      };

      window.payhere.startPayment(payment);
    } catch (error) {
      console.error("Error fetching hash:", error);
    }
  };

  return (
    <div className="payment">
      <div className="payment-left">
        <h2>Payment Details</h2>
        <div className="user-details">
          <h3>User Details</h3>
          <p>
            <strong>Name:</strong> {userDetails.firstName}{" "}
            {userDetails.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Contact Number:</strong> {userDetails.contactNumber}
          </p>
        </div>
        <div className="package-details">
          <h3>Package Details</h3>
          <p>
            <strong>Selected Plan:</strong>{" "}
            {selectedPlan === "annual" ? "Annual Plan" : "Monthly Plan"}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {selectedPlan === "annual" ? "$500/year" : "$50/month"}
          </p>
        </div>
        {workExperiences && (
          <div className="experience-details">
            <h3>Experience Details</h3>
            <p>
              <strong>Specialties:</strong>{" "}
              {workExperiences.specialties.join(", ")}
            </p>
            <p>
              <strong>Languages:</strong> {workExperiences.languages.join(", ")}
            </p>
            <p>
              <strong>Experiences:</strong>{" "}
              {workExperiences.experiences.join(", ")}
            </p>
            <p>
              <strong>Price Per Day:</strong> LKR {workExperiences.pricePerDay}
            </p>
          </div>
        )}
        <div className="button">
          <button onClick={handlePayment}>Pay now</button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
