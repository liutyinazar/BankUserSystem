import "./Header.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setLastClicked(buttonName);
  };

  return (
    <header className="header">
      <Link to="/users">
        <p
          onClick={() => handleButtonClick("Users")}
          className={lastClicked === "Users" ? "active" : ""}
        >
          Users
        </p>
      </Link>

      <p
        onClick={() => handleButtonClick("Banks")}
        className={lastClicked === "Banks" ? "active" : ""}
      >
        <Link to="/banks">Banks</Link>
      </p>
    </header>
  );
};

export default Header;
