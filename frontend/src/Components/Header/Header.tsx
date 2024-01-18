import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="users/">
        <p>Users</p>
      </Link>
      <Link to="banks/">
        <p>Banks</p>
      </Link>

    </header>
  );
};

export default Header;
