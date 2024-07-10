import React, { useState, useRef, useEffect } from 'react'
import './InviteTripmate.scss';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import EmailIcon from '@mui/icons-material/Email';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const InviteTripmate = () => {
  const [email, setEmail] = useState('')
  const [sendEmail, setSendEmail] = useState(false)
  const sendEmailRef = useRef(null)

  const handleInputChange = (event) => {
    setEmail(event.target.value)
    setSendEmail(true)
  }

  const handleClickOutside = (event) => {
    if (sendEmailRef.current && !sendEmailRef.current.contains(event.target)) {
      setSendEmail(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='inviteTripmate'>
        <div className="container">
            <div className="closing-i">
                <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div>
            <div className="hearder">
                <span>Invite Tripmates</span>
            </div>
            <div className="link-container">
                <i><LinkIcon sx={{ color: '#747474', fontSize: 25 }} /></i>
                <span className='invite-link'>https://venturevibe.com/ffffmdmff</span>
                <div className="copy-btn">
                    <span>Copy Link</span>
                </div>
            </div>
            <div className="email-container">
                <i><MailOutlineOutlinedIcon sx={{ color: '#747474', fontSize: 25 }}/></i>
                <input
                  type="text"
                  placeholder='invite by email'
                  value={email}
                  onChange={handleInputChange}
                />
            </div>
            {sendEmail && (
              <div className="send-email-container" ref={sendEmailRef}>
                <i><EmailIcon sx={{ color: '#747474', fontSize: 25 }}/></i>
                <div className="detail-container">
                    <span className='send-email'>Send an email</span>
                    <span className='friend-email'>{email ? `to ${email}` : 'to'}</span>
                </div>
              </div>
            )}
            <hr className='hr-tag'/>
            <div className="manage-tripmates">
                <i><ManageAccountsIcon sx={{ color: '#747474', fontSize: 18 }}/></i>
                <span>Manage Tripmates</span>
            </div>
        </div>
    </div>
  )
}

export default InviteTripmate
