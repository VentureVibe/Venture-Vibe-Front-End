import React, { useEffect, useState } from "react";
import "./ContentOversight.scss";
import newRequest from "../../../services/NewRequst";

const ContentOversight = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    newRequest.get(`reports`)
      .then(response => {
        setReports(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError('There was an error fetching the Reports.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleRemove = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: "Removed" } : report
      )
    );
  };

  const handleKeep = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: "Post" } : report
      )
    );
  };

  return (
    <div className="content-oversight">
      <h1>Content Oversight</h1>
      <table className="content-oversight-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Blog Title</th>
            <th>Blog Author</th>
            <th>Reported By</th>
            <th>Report Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.post.content}</td>
              <td>{report.post.userId}</td>
              <td>{report.userReported.id}</td>
              <td>{report.reason}</td>
              <td>{report.status}</td>
              <td>
                {report.status === "PENDING" ? (
                  <>
                    <button
                      className="action-button remove"
                      onClick={() => handleRemove(report.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="action-button keep"
                      onClick={() => handleKeep(report.id)}
                    >
                      Keep
                    </button>
                  </>
                ) : (
                  <span>{report.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentOversight;
