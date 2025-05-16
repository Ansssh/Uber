import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const logoutUser = async () => {
      if (!token) {
        navigate('/login'); 
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          localStorage.removeItem('token');
          navigate('/login');
          console.log("Logout successful");
        } else {
          console.error("Logout failed with status:", res.status, res.data);
          // Handle other error statuses if needed
          localStorage.removeItem('token'); // Still clear the token on the frontend
          navigate('/login'); // Redirect to login even if logout API fails (optional, depends on your logic)
        }
      } catch (error) {
        console.error("Logout error:", error);
        localStorage.removeItem('token');
        navigate('/login'); 
      }
    };

    logoutUser();
  }, [navigate, token]);

  return (
    <div>Logging out...</div>
  );
};

export default UserLogout;