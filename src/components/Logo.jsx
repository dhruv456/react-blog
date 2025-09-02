import React from "react";
import blogLogo from "../../src/assets/blog-site.png";

const Logo = ({ size = "100px" }) => {
  return (
    <div>
      <img src={blogLogo} alt="Logo" style={{ width: size, height: size }} />
    </div>
  );
};

export default Logo;
