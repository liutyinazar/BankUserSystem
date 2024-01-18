import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1>Header</h1>
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
