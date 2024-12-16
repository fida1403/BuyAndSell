import { faFacebook, faTwitter, faBehance, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import footerlogopng from '../Assets/footerlogo.png';

const Footer = () => {
    return(
        <div>
        <footer className="bg-black text-white py-6 text-center shadow-inner flex items-center justify-between">
            <p className="text-sm flex items-center ml-12">
                <img src={footerlogopng} alt="logo" className="mr-2 w-15 h-5 object-contain" />
                | Copyright 2024
            </p>
            <div className="flex space-x-6 mr-12">
                <a href="https://www.facebook.com/" className="text-gray-400 hover:text-white transition duration-300"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="https://x.com/" className="text-gray-400 hover:text-white transition duration-300"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://www.behance.net/" className="text-gray-400 hover:text-white transition duration-300"><FontAwesomeIcon icon={faBehance} /></a>
                <a href="https://www.youtube.com/" className="text-gray-400 hover:text-white transition duration-300"><FontAwesomeIcon icon={faYoutube} /></a>    
            </div>
        </footer>
        </div>
    )
}

export default Footer;