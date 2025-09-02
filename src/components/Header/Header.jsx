import React, { act, useEffect, useState } from "react";
import authService from "../../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../feature/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import Button from "../Button";
const Header = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
  ];

  return (
    <header className="py-3 bg-black shadow w-full">
      <Container>
        <nav className="flex ">
          <div className="mr-4">
            <Link to="/">
              <Logo size="50px" />
            </Link>
          </div>
          <ul className="flex items-center gap-4 ml-auto">
            {navItems.map((item, index) => {
              return item.active ? (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="duration-200 hover:bg-blue-100 hover:text-black text-xl rounded-full inline-block px-6 py-2 cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null;
            })}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
