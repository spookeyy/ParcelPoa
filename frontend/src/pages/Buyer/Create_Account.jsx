import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

function Create_Account() {
  const nav = useNavigate();
  
  const {addUser} = useContext(UserContext);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [user_role, setuser_role] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [generalError, setGeneralError] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;

    if (phone_number.trim() === "") {
      setPhoneError("Phone number is required");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters long");
      hasError = true;
    } else if (!isPasswordValid(password)) {
      setPasswordError(
        "Password should contain at least one digit and should not be a simple sequence."
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match");
      hasError = true;
    } else {
      setRepeatPasswordError("");
    }

    addUser(fullName, email, phone_number, password, user_role)
      .then(() => {
        // Clear form fields
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRepeatPassword("");

        // =navigate to login page after successful registration
        nav("/login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        if (error.message === "Email already exists") {
          toast.error("Email already exists");
          setEmailError(true);
        } else if (error.message === "Phone number already exists") {
          toast.error("Phone number already exists");
          setPhoneError(true);
        } else {
          toast.error("Registration failed");
          setGeneralError(`Registration failed: ${error.message}`);
        }
      });

      
    //set general error
    if (hasError) {
      setGeneralError("Please correct the errors in the form.");
      return;
    }
  }

  function isPasswordValid(password) {
    const containsDigit = /\d/.test(password);
    const isSequential = /(123|234|345|456|567|678|789|890|901)/.test(password);

    return containsDigit && !isSequential;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>
        {generalError && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {generalError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
              ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                emailError ? "text-red-500" : ""
              }`}
              placeholder="Enter email address"
              required
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone_number}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError(false);
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter phone number"
              required
            />
          </div>
          {phoneError && (
            <p className="mt-1 text-sm text-red-600">{phoneError}</p>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(isPasswordValid(e.target.value));
              }}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                passwordError ? "text-red-500" : ""
              }`}
              placeholder="Enter password"
              required
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                setRepeatPasswordError(
                  e.target.value !== password ? "Passwords do not match" : ""
                );
              }}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                ${
                  repeatPasswordError ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                repeatPasswordError ? "text-red-500" : ""
              }`}
              placeholder="Confirm password"
              required
            />
            {repeatPasswordError && (
              <p className="mt-1 text-sm text-red-600">{repeatPasswordError}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="agent-option"
              className="block text-sm font-medium text-gray-700"
            >
              Select Account Type
            </label>
            <select
              id="agent-option"
              value={user_role}
              onChange={(e) => setuser_role(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Agent">Agent</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-base text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
          <p className="mt-4 text-sm text-center">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Create_Account
