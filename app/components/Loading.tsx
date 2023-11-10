import React from 'react';

function Loading() {
  return (
    <div className='flex items-center fixed top-0 left-0 right-0 bottom-0 bg-base-100'>
      <div className='w-full h-4 text-center'>
        <div className='dot relative w-15 h-15 mx-2 inline-block'>
          <div className='before:dot-animate'></div>
          <div className='after:dot-shadow'></div>
        </div>
        <div className='dot relative w-15 h-15 mx-2 inline-block'>
          <div className='before:dot-animate'></div>
          <div className='after:dot-shadow'></div>
        </div>
        <div className='dot relative w-15 h-15 mx-2 inline-block'>
          <div className='before:dot-animate'></div>
          <div className='after:dot-shadow'></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
