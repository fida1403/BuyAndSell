import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = ({ data }) => {
    const [activeMenu, setActiveMenu] = useState(data);
    const navigate = useNavigate();
    return (
        <div className='mt-5 w-1/5 bg-white p-6 mb-12'>
            <aside>
                <nav className="space-y-4">
                    <button
                        className={`block text-gray-700 font-semibold px-4 py-2 rounded-md ${activeMenu === 'My Account' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => {
                            setActiveMenu('My Account');
                            navigate('/dashboard');
                        }}
                    >
                        My Account
                    </button>

                    <button
                        className={`block text-gray-700 font-semibold px-4 py-2 rounded-md ${activeMenu === 'Profile' ? 'bg-black text-white' : ''}`}
                        onClick={() => setActiveMenu('Profile')}
                    >
                        Profile
                    </button>

                    <button
                        className={`block text-gray-700 font-semibold px-4 py-2 rounded-md ${activeMenu === 'Ads' ? 'bg-black text-white' : ''}`}
                        onClick={() => setActiveMenu('Ads')}
                    >
                        Ads
                    </button>

                    <button
                        className={`block text-gray-700 font-semibold px-4 py-2 rounded-md ${activeMenu === 'Post Ad' ? 'bg-black text-white' : ''}`}
                        onClick={() => {
                            setActiveMenu('Post Ad');
                            navigate("/postAdvertisement"); 
                        }}
                    >
                        Post Ad
                    </button>

                    <button
                        className={`block text-gray-700 font-semibold px-4 py-2 rounded-md ${activeMenu === 'Logout' ? 'bg-black text-white' : ''}`}
                        onClick={() => {
                            setActiveMenu("Logout");
                            localStorage.removeItem("token"); 
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </nav>
            </aside>
        </div>
    )
}

export default SideBar;