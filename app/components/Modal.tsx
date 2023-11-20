'use client';

interface IModalProps {
  id: string;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({ id, children }) => {
  return (
    <>
      <dialog id={id} className='modal'>
        <div className='modal-box w-11/12 max-w-5xl'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            {/* <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10'>
              ✕
            </button> */}
          </form>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
