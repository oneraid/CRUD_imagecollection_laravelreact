import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser} from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { LuBookmark } from "react-icons/lu";

const SideBar = () => {
  const navigate = useNavigate();

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

  const menus = [
    { name: "Explore", link: "/home", icon: MdOutlineDashboard },
    { name: "My Collections", link: "/my-collection", icon: FiFolder },
    { name: "Saved", link: "/favorites", icon: LuBookmark },
    { name: "Messages", link: "/", icon: FiMessageSquare },
    { name: "Setting", link: "/", icon: RiSettings4Line },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "User", link: "/", icon: AiOutlineUser },
    { name: "Logout", link: "#", icon: TbLogout2, onClick: handleLogout },
  ];

  const [open, setOpen] = useState(false); // Default: sidebar closed

  return (
    <div
      className={`bg-[#0e0e0e] min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4 fixed top-0 left-0 bottom-0 z-50`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <React.Fragment key={i}>
            {menu.name === "Logout" ? (
              <div
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                onClick={menu.onClick}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu?.name}
                </h2>
              </div>
            ) : (
              <Link
                to={menu?.link}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu?.name}
                </h2>
              </Link>
            )}
            {menu.name === "Cart" && <hr className="my-2 border-gray-600" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
