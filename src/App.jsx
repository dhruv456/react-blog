import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import authService from "./service/auth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./feature/authSlice";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllPost from "./pages/AllPost";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-600 flex items-center justify-center flex-col text-amber-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="posts" element={<AllPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
