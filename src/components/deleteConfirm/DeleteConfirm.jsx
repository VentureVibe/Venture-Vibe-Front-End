import React from 'react'
import './DeleteConfirm.scss'

const DeleteConfirm = ({onClose,onConfirm,message}) => {
  return (
    <div className='DeleteConfirm'>
        <div className="confirm-delete-dialog-overlay" onClick={onClose}></div>
      <div className="confirm-delete-dialog-content">
        <h2>{message}</h2>
        <div className="confirm-delete-dialog-buttons">
          <button className="confirm-delete-dialog-confirm" onClick={onConfirm}>Yes</button>
          <button className="confirm-delete-dialog-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm
