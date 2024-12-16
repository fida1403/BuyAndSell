import React, { useState } from "react";
import { faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import illustrationpng from '../Assets/illustration.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
import Footer from "./Footer";
import loginpng from '../Assets/logo.png';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const { username, email, password } = formData;

        try {
            const response = await registerUser({ username, email, password });
            if (response.jwt) {
                localStorage.setItem("token", response.jwt);
                toast.success('Registration successful', {
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
                    navigate("/");
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
                    theme: "light",

                });
            }
        } catch (err) {
            setError("An error occurred during registration.");
            toast.error("An error occurred during registration.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col mt-10">
            <Header />
            <ToastContainer />
            <div className="flex flex-1 items-center justify-center px-6 py-10">
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
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Your Account</h2>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 text-left">
                                    Email <span className="text-pink-500">*</span>
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
                                        placeholder="Type your email"
                                    />
                                    <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 text-left">
                                    Username <span className="text-pink-500">*</span>
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
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
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
                                        placeholder="Type your password"
                                    />
                                    <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 text-left">
                                    Confirm Password <span className="text-pink-500">*</span>
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
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
                                Register <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </form>
                    </div>
                    <div className="p-8 bg-gradient-to-r from-pink-50 to-pink-100 flex flex-col justify-center items-center text-center">
                        <img
                            src={illustrationpng}
                            alt="Illustration"
                            className="mb-6 object-contain h-[250px]"
                        />
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Already Have an Account?</h2>
                        <p className="text-gray-600 text-sm mb-8">
                            To connect with us, please login to our account if you are having one already.
                        </p>
                        <button className="px-6 py-3 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition transform duration-300 active:scale-95 hover:scale-105"
                            onClick={() => navigate("/")}>
                            Login <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
