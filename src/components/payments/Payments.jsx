import React, { useEffect, useState } from "react";
import "./payment.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetCurrentUserC } from "../../services/user/GetCurrentUserC";

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
    console.log("Work Experience : ", workExperiences);
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
          const serviceProviderDetails = {
            id: decodedToken.sub,
            role: workExperiences ? "TravelGuide" : "EventPlanner",
            purchaseDate: purchaseDate.toISOString(),
            expirationDate: expirationDate.toISOString(),
            planType: selectedPlan,
            contactNumber: userDetails.contactNumber,
            email: userDetails.email,
            sp_lat: userDetails.location.lat,
            sp_lng: userDetails.location.lng,
          };

          // Check if workExperiences is defined
          const endpoint = workExperiences
            ? "http://localhost:8080/api/v1/serviceProvider/add-travel-guide"
            : "http://localhost:8080/api/v1/serviceProvider/add-event-planner";

          const result = await axios.post(endpoint, {
            ...serviceProviderDetails,
            workExperience: workExperiences,
          });
          const result2 = await axios.put(
            `http://localhost:8080/api/v1/public/traveler/${decodedToken.sub}`,
            {
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              role: workExperiences ? "TravelGuide" : "EventPlanner",
            }
          );

          console.log("Service provider stored successfully:", result.data);
          console.log("Service provider stored successfully:", result2.data);
          navigate("/");
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
    <div className="Payments">
      <div className="button">
        <button onClick={handlePayment}>Pay now</button>
      </div>
    </div>
  );
};

export default Payments;
