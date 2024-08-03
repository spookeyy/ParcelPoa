// import React from 'react'

// export default function Reset_Password() {
//   return (
//     <div className='flex items-center justify-center  bg-gray-100 p-6 dark:bg-gray-900 dark:text-gray-100 '>
//         <form className="max-w-sm mx-auto">
//           <div className="mb-5">
//             <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//             <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
//           </div>
//           <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//         </form>
//     </div>
//   )
// }
import React, { useState } from 'react';

export default function ForgotPassword({ isOpen, onClose, onResetPassword }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    onResetPassword(email);
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h3 className="text-2xl font-bold mb-4">Reset Password</h3>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
