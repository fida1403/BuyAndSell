import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUserProfile } from '../api';
import profilepng from "../Assets/profile.png";
import img1pmg from "../Assets/AdImages/image1.png";
import img2png from "../Assets/AdImages/image2.png";
import SideBar from './SideBar';

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // console.log(localStorage.getItem("token"));
        const token = localStorage.getItem("token");
        if (!token) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }

        const getProfile = async () => {
            try {
                const data = await fetchUserProfile(token);
                setProfile(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
            <Header />
            <div className="flex mt-20 ml-10 flex-1">
                <SideBar data='My Account' />
                <main className="flex-1 p-5 flex flex-col space-y-6">
                    <div className="relative bg-gray-50 p-4 rounded-lg shadow">
                        <div className="flex mb-8 p-2 rounded-lg">
                            <img className="w-20 h-20 rounded-full mr-6" src={profilepng} alt="User Avatar" />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-left">{profile.username}</h2>
                                <p className="text-gray-500 text-left">Member since <br />2019</p>
                                <hr className="border-t border-gray-300 my-4" />
                                <div className="flex items-center mt-4 space-x-4 text-gray-500">
                                    <p className="flex items-center space-x-2">
                                        <span className="material-icons"><FontAwesomeIcon icon={faLocationDot} /></span>
                                        <span>Ash Dr. San Jose, South Dakota | </span>
                                    </p>
                                    <p className="flex items-center space-x-2">
                                        <span className="material-icons"><FontAwesomeIcon icon={faEnvelope} /></span>
                                        <span>{profile.email} | </span>
                                    </p>
                                    <p className="flex items-center space-x-2">
                                        <span className="material-icons"><FontAwesomeIcon icon={faPhone} /></span>
                                        <span>(480) 555-0103</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4">
                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">Edit Profile</button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex bg-gray-50 p-4 rounded-lg shadow">
                            <img
                                className="w-24 h-24 object-cover rounded-md mr-6"
                                src={img1pmg}
                                alt="Luxury Apartment"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">Luxury couple apartment</h3>
                                <p className="text-gray-500">Dallas, Texas • 24hrs ago</p>
                                <p className="text-lg font-bold text-gray-800">$124.80</p>
                            </div>
                            <div className="ml-auto flex items-center space-x-4">
                                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">View</button>
                                <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">Edit Ad</button>
                            </div>
                        </div>
                        <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                            <img
                                className="w-24 h-24 object-cover rounded-md mr-6"
                                src={img2png}
                                alt="Beats Studio 3"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">Beats Studio 3 Wireless Over Ear</h3>
                                <p className="text-gray-500">Dallas, Texas • 24hrs ago</p>
                                <p className="text-lg font-bold text-gray-800">$124.80</p>
                            </div>
                            <div className="ml-auto flex items-center space-x-4">
                                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">View</button>
                                <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">Edit Ad</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
