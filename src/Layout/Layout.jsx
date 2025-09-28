import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex-grow py-8 w-xl mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
