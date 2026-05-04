import { LOGO_URL } from "../../public/utils/constants";

import { useState } from "react";


const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");

  console.log("Header rendered");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src="logo.png" />
      </div>

      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>About us</li>
          <li>Cart</li>
          <button
            className="login-btn"
            onClick={() => {
              btnNameReact === "Login"
                ? setbtnNameReact("Logout")
                : setbtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
