import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userName = response.data.name;
        setUserName(userName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-2xl fixed w-full z-40">
      <div className="flex-1">
        <div className="mx-2 flex-1 px-5 ml-20">OneGallery</div>
      </div>
      <div className="flex-none">
        <div className="form-control">
          <h1>
            <a>{userName ? userName : "Loading..."}</a>
          </h1>
        </div>
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="mx-5 btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><a onClick={() => navigate('/my-collection')}>My Collections</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
