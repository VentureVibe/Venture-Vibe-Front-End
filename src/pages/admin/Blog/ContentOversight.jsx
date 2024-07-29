import React, { useState } from "react";
import "./ContentOversight.scss";

const ContentOversight = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      blogTitle: "Sample Blog Post",
      blogAuthor: "user123",
      reportedBy: "user456",
      reportReason: "Inappropriate content",
      status: "Pending",
    },
    {
      id: 2,
      blogTitle: "Sample Blog Post",
      blogAuthor: "user123",
      reportedBy: "user456",
      reportReason: "Inappropriate content",
      status: "Pending",
    },
    {
      id: 3,
      blogTitle: "Sample Blog Post",
      blogAuthor: "user123",
      reportedBy: "user456",
      reportReason: "Inappropriate content",
      status: "Pending",
    },
    {
      id: 4,
      blogTitle: "Sample Blog Post",
      blogAuthor: "user123",
      reportedBy: "user456",
      reportReason: "Inappropriate content",
      status: "Pending",
    },
    {
      id: 5,
      blogTitle: "Sample Blog Post",
      blogAuthor: "user123",
      reportedBy: "user456",
      reportReason: "Inappropriate content",
      status: "Pending",
    },
    {
      id: 6,
      blogTitle: "Sample Blog Post",
      blogAuthor: "user123",
      reportedBy: "user456",
      reportReason: "Inappropriate content",
      status: "Pending",
    },
    {
      id: 7,
      blogTitle: "Sample Blog Post",
      blogAuthor: "user123",
      reportedBy: "user456",
      reportReason: "Inappropriate content",
      status: "Pending",
    },
    // Add more report objects as needed
  ]);

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
              <td>{report.blogTitle}</td>
              <td>{report.blogAuthor}</td>
              <td>{report.reportedBy}</td>
              <td>{report.reportReason}</td>
              <td>{report.status}</td>
              <td>
                {report.status === "Pending" ? (
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
