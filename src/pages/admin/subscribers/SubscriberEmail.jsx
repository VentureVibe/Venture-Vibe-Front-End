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
        console.log(resoponse.data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div>
      <div className="subscriber-container">
        <h1 className="subscriber-title">Subscribers List</h1>
        <table className="subscriber-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id}>
                <td>{subscriber.id}</td>
                <td>{subscriber.email}</td>
                <td>{subscriber.subscribedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriberEmail;
