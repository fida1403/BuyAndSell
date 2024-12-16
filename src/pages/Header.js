import loginpng from '../Assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const handlePostAdClick = () => {
        if (isAuthenticated) {
            navigate("/postAdvertisement");
        } else {
            toast.error("Please log in to post an ad", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };

    return (
        <div>
         <ToastContainer />
            <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-2 bg-white text-black shadow-md z-50">
                <h1 className="text-3xl font-extrabold tracking-tight">
                    <img src={loginpng} alt="logo" className="w-25 h-5 object-contain mt-1 mb-1"></img>
                </h1>
                <div className="space-x-4">
                    <button className="text-sm font-medium hover:underline"><FontAwesomeIcon icon={faUser} /> Sign In</button>
                    <button className="px-5 py-2 bg-pink-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-pink-600 transition duration-300"
                        onClick={handlePostAdClick}>
                        Post Your Ad <FontAwesomeIcon icon={faArrowRight}/>
                    </button>
                </div>
            </header>
        </div>
    )
}

export default Header;