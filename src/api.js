const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const registerUser = async (userData) => {
    console.log("BASE_URL:", BASE_URL);
    const response = await fetch(`${BASE_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY, 
      },
      body: JSON.stringify(userData),
    });
  
    return response.json();
  };
  
  export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY, 
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  export const fetchUserProfile = async (token) => {
    const response = await fetch(`${BASE_URL}/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": API_KEY
      },
    });
    return response.json();
  };

  export const createAdvertisement = async (token, adData) => {
    const response = await fetch(`${BASE_URL}/api/advertisements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": API_KEY, 
      },
      body: JSON.stringify(adData),
    });
    return response.json();
  };
  
