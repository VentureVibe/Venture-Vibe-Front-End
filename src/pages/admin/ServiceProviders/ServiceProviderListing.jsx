import React, { useState } from "react";
import "./ServiceProviderListing.scss";

const ServiceProviderListing = () => {
  const [serviceProviders, setServiceProviders] = useState([
    {
      id: 1,
      name: "TravelCo",
      email: "contact@travelco.com",
      service: "Travel Agency",
    },
    {
      id: 2,
      name: "GuidePro",
      email: "info@guidepro.com",
      service: "Tour Guide",
    },
    // Add more service providers as needed
  ]);

  const handleDelete = (providerId) => {
    const updatedProviders = serviceProviders.filter(
      (provider) => provider.id !== providerId
    );
    setServiceProviders(updatedProviders);
  };

  const handleEdit = (provider) => {
    // Implement edit functionality if needed
    console.log("Editing provider:", provider);
  };

  return (
    <div className="service-provider-listing">
      <h1>Service Provider Listings</h1>
      <div className="provider-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceProviders.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.id}</td>
                <td>{provider.name}</td>
                <td>{provider.email}</td>
                <td>{provider.service}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(provider)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(provider.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceProviderListing;
