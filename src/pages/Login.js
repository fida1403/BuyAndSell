import React, { useState } from "react";
import { faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import illustrationpng from '../Assets/illustration.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
import Footer from "./Footer";
import loginpng from '../Assets/logo.png';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {

  const [credentials, setCredentials] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      if (response.jwt) {
        localStorage.setItem("token", response.jwt);
        toast.success('Login successful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(() => {
            navigate("/dashboard");
        }, 1500);
      } else {
        setError(response.error.message);
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <ToastContainer />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center items-center">
              <img
                src={loginpng}
                alt="logo"
                className="mb-6 w-35 h-10 object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm mb-8">
              <span className="font-bold">Listbnb</span> a Largest Classified Listing Marketplace offers perfect Ads classifieds...
            </p>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Login To Your Account</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                  Username <span className="text-pink-500">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    name="identifier"
                    value={credentials.identifier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
                    placeholder="Type your username"
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                  Password <span className="text-pink-500">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
                    placeholder="Type your password"
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition transform duration-300 active:scale-95 hover:scale-105"
              >
                Login <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>
          </div>

          <div className="p-8 bg-gradient-to-r from-pink-50 to-pink-100 flex flex-col justify-center items-center text-center">
            <img
              src={illustrationpng} 
              alt="Illustration"
              className="mb-6 object-contain h-[250px]"
            />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Don’t Have an Account?</h2>
            <p className="text-gray-600 text-sm mb-8">
              To connect with us, please register for a new account if you are not having one already.
            </p>
            <button className="px-6 py-3 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition transform duration-300 active:scale-95 hover:scale-105"
              onClick={() => navigate("/register")}>
              Register <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
