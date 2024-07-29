import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './ReportPost.scss'
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import newRequest from '../../services/NewRequst';

const ReportPost = ({ onClose, id }) => {
    const [reports, setReports] = useState([]);
    const [reportContent, setReportContent] = useState('');

    const userId = GetCurrentUserC().sub;

    const handleReportSubmit = async (event) => {
        event.preventDefault();
    
        if (!messageContent.trim()) {
          return; // Don't send empty messages
        }
    
        const reportData = {
          content: reportContent,
          sender: {
            id: userId,
          },
          recipient: {
            id: id,
          },
        };
    
        try {
          const response = await newRequest.post('chat/send', reportData);
          console.log('Success:', response.data);
          setReports(response.data);
          setReportContent(''); // Clear the input field
          onClose();
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <div className='ReportPost'>
        <div className="closing-i" onClick={onClose}>
            <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
        </div>
        <div className="top">
            <h1>Report Post</h1>
        </div>
        <div className="bottom">
            <form>
                <div className="reason">
                    <label htmlFor="">Reason :</label>
                    <textarea type='text' onChange={(e) => setReportContent(e.target.value)}/>
                </div>
                <button onClick={handleReportSubmit}>Report</button>
            </form>
        </div>
    </div>
  )
}

export default ReportPost