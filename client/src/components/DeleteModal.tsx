import React, {useContext} from 'react';
import { DeleteBoardContext } from '../context/DeleteBoardContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (uuid: string) => void; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const {setModalOpen, handleDeleteBoard} = useContext(DeleteBoardContext)
  
  
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none'>
      <div className='relative w-auto max-w-sm mx-auto my-6 bg-white rounded-lg shadow-lg'>
        <div className='flex items-start justify-between p-5 border-b border-gray-200 rounded-t'>
          <h3 className='text-lg font-semibold'>Confirm Delete</h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
          >
            <svg
              className='w-6 h-6'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>
        <div className='p-5'>
          <p className='text-sm text-gray-700'>
            Are you sure you want to delete this board?
          </p>
        </div>
        <div className='flex items-center justify-end px-5 py-4 bg-gray-100 border-t border-gray-200 rounded-b'>
          <button
            className='px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none'
            onClick={() => {
              handleDeleteBoard();
            }}
          >
            Delete
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className='px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
