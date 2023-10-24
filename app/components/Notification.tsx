import React from 'react';

interface INotificationProps {
  message: string;
  isShowing: boolean;
  success: boolean;
}

function Notification({ isShowing, message, success }: INotificationProps) {
  if (isShowing) {
    return (
      <div className='notification-container'>
        <div
          className='notification'
          data-success={success}
          data-testid='notification'>
          <i className={`fa-solid fa-${success ? 'check' : 'xmark'}`} />
          <p className='notification-message'>{message}</p>
        </div>
      </div>
    );
  }
}

export default Notification;
