import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SubscriberEmail.scss";

const SubscriberEmail = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/subscribers"
        );
        setSubscribers(response.data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchSubscribers();
  }, []);

  const handleSendNewsletter = () => {
    alert("Newsletter has been sent to all subscribers!");
    // Add actual functionality to send newsletters via backend here.
  };

  return (
    <div className="subscriber-container">
      <h1 className="subscriber-title">Subscribers List</h1>
      <button className="send-newsletter-button" onClick={handleSendNewsletter}>
        Send Newsletter
      </button>
      <table className="subscriber-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, index) => (
            <tr key={subscriber.id}>
              <td>{index + 1}</td>
              <td>{subscriber.email}</td>
              <td>Traveler</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriberEmail;
