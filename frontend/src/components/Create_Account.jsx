import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { server } from "../../config.json";
import Navbar from "./Navbar";

function Create_Account() {
  const nav = useNavigate();
  const { addUser } = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [user_role, setUserRole] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [primaryRegion, setPrimaryRegion] = useState("");
  const [operationAreas, setOperationAreas] = useState([]);
  const [availableRegions, setAvailableRegions] = useState({});

  useEffect(() => {
    fetch(`${server}/get-regions`)
      .then((response) => response.json())
      .then((data) => setAvailableRegions(data))
      .catch((error) => console.error("Error fetching regions:", error));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;

    if (phone_number.trim() === "") {
      setPhoneError("Phone number is required");
      hasError = true;
      // if phone exists in database
    } else {
      setPhoneError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
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

    if (hasError) {
      setGeneralError("Please correct the errors in the form.");
      return;
    }

    const userData = {
      name: fullName,
      email,
      phone_number,
      password,
      user_role,
      primary_region: primaryRegion,
      operation_areas: user_role === "Agent" ? operationAreas : [],
    };

    addUser(userData)
      .then(() => {
        // Clear form fields
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRepeatPassword("");
        setUserRole("");
        setPrimaryRegion("");
        setOperationAreas([]);

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
  }

  function isPasswordValid(password) {
    const containsDigit = /\d/.test(password);
    const isSequential = /(123|234|345|456|567|678|789|890|901)/.test(password);

    return containsDigit && !isSequential;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 sm:p-6">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden sm:rounded-2xl sm:overflow-visible mt-2 mb-8">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-l from-yellow-500 to-yellow-600 p-8 text-white flex flex-col justify-center">
              <h2 className="text-3xl text-gray-600 italic font-bold mb-4">
                Welcome to ParcelPoa
              </h2>
              <p className="mb-4">
                Create your account and start your journey with us.
              </p>
              <p className="text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-gray-800 hover:underline font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Create Account
              </h2>
              {generalError && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                  {generalError}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="full name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className={`w-full px-3 py-2 border ${
                        emailError ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm ${
                        emailError ? "text-red-500" : ""
                      }`}
                      placeholder="email address"
                      required
                    />
                    {emailError && (
                      <p className="mt-1 text-xs text-red-600">{emailError}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                      placeholder="phone number"
                      required
                    />
                    {phoneError && (
                      <p className="mt-1 text-xs text-red-600">{phoneError}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password || ""}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(isPasswordValid(e.target.value));
                      }}
                      className={`w-full px-3 py-2 pr-10 border ${
                        passwordError ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm ${
                        passwordError ? "text-red-500" : ""
                      }`}
                      placeholder="password"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 hover:text-gray-800"
                      style={{ top: "24px" }}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                    {passwordError && (
                      <p className="mt-1 text-xs text-red-600">
                        {passwordError}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={repeatPassword || ""}
                      onChange={(e) => {
                        setRepeatPassword(e.target.value);
                        setRepeatPasswordError(
                          e.target.value !== password
                            ? "Passwords do not match"
                            : ""
                        );
                      }}
                      className={`w-full px-3 py-2 pr-10 border ${
                        repeatPasswordError
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm ${
                        repeatPasswordError ? "text-red-500" : ""
                      }`}
                      placeholder="confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 hover:text-gray-800"
                      style={{ top: "24px" }}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                    {repeatPasswordError && (
                      <p className="mt-1 text-xs text-red-600">
                        {repeatPasswordError}
                      </p>
                    )}
                  </div>

                <div>
                  <label htmlFor="user_role" className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <select
                    id="user_role"
                    value={user_role}
                    onChange={(e) => setUserRole(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Agent">Agent</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                {user_role && (
                  <div>
                    <label htmlFor="primary_region" className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Region
                    </label>
                    <select
                      id="primary_region"
                      value={primaryRegion}
                      onChange={(e) => setPrimaryRegion(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                    >
                      <option value="" disabled>Select a region</option>
                      {Object.keys(availableRegions).map((region, index) => (
                        <option key={index} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                )}

                {user_role === 'Agent' && primaryRegion && (
                  <div>
                    <label htmlFor="operation_areas" className="block text-sm font-medium text-gray-700 mb-1">
                      Operational Areas
                    </label>
                    <select
                      id="operation_areas"
                      multiple
                      value={operationAreas}
                      onChange={(e) => setOperationAreas(Array.from(e.target.selectedOptions, option => option.value))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                    >
                      {availableRegions[primaryRegion] && availableRegions[primaryRegion].map((area, index) => (
                        <option key={index} value={area}>{area}</option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple areas</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-black hover:bg-yellow-800 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                  Create Account
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create_Account;