import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
export default function Login() 
{
  const {login} = useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const handleSubmit = (e) =>{
    e.preventDefault()

    login(email, password)

    setEmail('')
    setPassword('')
  }

  

  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1642480485642-63b9018eadc2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naW4lMjBwYWdlfGVufDB8fDB8fHww')" }}>
      <div className="login-container p-8 bg-white shadow-md rounded max-w-sm">
        <h3 className="text-2xl font-bold mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
        <p className="mt-2 text-sm text-center">
          <button onClick={handleResetPassword} className="text-blue-600 hover:underline">
            Reset Password
          </button>
        </p>
      </div>
    </div>
  );
}
