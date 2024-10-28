import React, { useEffect, useState } from "react";
import "./ContentOversight.scss";
import newRequest from "../../../services/NewRequst";

const ContentOversight = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await newRequest.get(`reports`);
        setReports(response.data);
      } catch (error) {
        console.error("There was an error!", error);
        setError("There was an error fetching the Reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`communityPost/${id}`);
      console.log("Post deleted successfully");
    } catch (error) {
      setError("There was an error deleting the post.");
      console.error("Error deleting post:", error);
    }
  };

  const handleReportUpdate = async (id) => {
    const reportData = {
      status: "REMOVED",
    };
    try {
      const response = await newRequest.put(`reports/${id}`, reportData);
      console.log("Success:", response.data);
    } catch (error) {
      setError("There was an error updating the report.");
      console.error("Error:", error);
    }
  };

  const handleRemove = async (reportId, postId) => {
    await handleReportUpdate(reportId);
    await handleDelete(postId);
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: "REMOVED" } : report
      )
    );
  };

  const handleKeep = (reportId) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: "POST" } : report
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="content-oversight">
      <h1>Content Oversight</h1>
      <table className="content-oversight-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Blog Content</th>
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
              <td className="content">{report.post.content}</td>
              <td>{report.post.userId}</td>
              <td>{report.userReported.id}</td>
              <td>{report.reason}</td>
              <td>{report.status}</td>
              <td>
                {report.status === "PENDING" ? (
                  <>
                    <button
                      className="action-button remove"
                      onClick={() => handleRemove(report.id, report.post.id)}
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
