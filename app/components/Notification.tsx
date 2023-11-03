import React from 'react';

interface INotificationProps {
  message: string;
  isShowing: boolean;
  success: boolean;
}

function Notification({ isShowing, message, success }: INotificationProps) {
  if (isShowing) {
    return (
      <div className='flex fixed left-1/2 transform -translate-x-1/2 justify-center z-50 mt-6'>
        <div
          className='bg-green-500 flex sticky justify-center items-center px-3 py-4 gap-3 rounded-lg font-bold shadow-lg'
          data-success={success}
          data-testid='notification'>
          <i className={`fa-solid fa-${success ? 'check' : 'xmark'}`} />
          <p className='text-white'>{message}</p>
        </div>
      </div>
    );
  }
}

export default Notification;
