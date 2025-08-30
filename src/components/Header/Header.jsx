import React, { useEffect, useState } from "react";
import authService from "../../service/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../../feature/authSlice";
const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-between w-2xl">
      <h1 className="text-2xl text-white">My Blog</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
