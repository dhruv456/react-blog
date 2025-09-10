import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const username = useSelector((state) => state.auth.userData);
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {username && <p>Hello, {username}!</p>}
    </div>
  );
};

export default Home;
