import "./Header.css";
import React from "react";

const Header = () => {
  return (
    <span onClick={() => window.scrollTo(0, 0)} className="header">
      🎬 Media Flix🎥
    </span>
  );
};

export default Header;
