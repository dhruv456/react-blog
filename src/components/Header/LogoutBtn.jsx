import React from "react";
import { logout } from "../../feature/authSlice";
import authService from "../../service/auth";
import { useDispatch } from "react-redux";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <div>
      <button
        className="inline-block px-6 py-2 rounded-full duration-200 hover:bg-red-500 hover:text-white cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
