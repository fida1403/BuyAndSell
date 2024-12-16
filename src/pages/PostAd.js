import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import { toast, ToastContainer } from "react-toastify";
import { createAdvertisement, fetchUserProfile } from "../api";
import { useNavigate } from "react-router-dom";

const PostAd = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token"); 
        if (!token) {
            toast.error("You must be logged in to post an ad.");
            setLoading(false);
            return;
        }

        try {
            const profile = await fetchUserProfile(token);
            if (!profile || profile.error) {
                toast.error("User not authenticated.");
                setLoading(false);
                return;
            }

            const response = await createAdvertisement(token, formData);

            if (response.error) {
                toast.error(response.error.message || "Failed to create advertisement.");
            } else {
                toast.success("Advertisement posted successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
            <Header />
            <div className="flex mt-20 ml-10 flex-1">
                <ToastContainer />
                <SideBar data="Post Ad" />
                <main className="flex-1 p-5">
                    <div className="flex justify-center bg-white rounded-lg shadow-md">
                        <div className="w-full max-w-3xl p-8">
                            <div className="flex mb-8 p-2 rounded-lg">
                                <div className="w-full">
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700 text-left">
                                                Ad Title <span className="text-pink-500">*</span>
                                            </label>
                                            <div className="relative mt-2">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
                                                    placeholder="Type here"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700 text-left">
                                                Price <span className="text-pink-500">*</span>
                                            </label>
                                            <div className="relative mt-2">
                                                <input
                                                    type="text"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
                                                    placeholder="Type here"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700 text-left">
                                                Description <span className="text-pink-500">*</span>
                                            </label>
                                            <div className="relative mt-2">
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
                                                    placeholder="Type here"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700 text-left">
                                                Photo <span className="text-pink-500">*</span>
                                            </label>
                                            <div className="relative mt-2">
                                                <input
                                                    type="url"
                                                    name="imageUrl"
                                                    value={formData.imageUrl}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
                                                    placeholder="Image Url"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition transform duration-300 active:scale-95 hover:scale-105"
                                        >
                                            Post
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default PostAd;
