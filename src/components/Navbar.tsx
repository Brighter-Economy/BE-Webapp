import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface NavLinkParams {
  path: string;
  content: any;
}

const NavLink: React.FC<NavLinkParams> = ({ path, content }) => {
  const location = useLocation();

  var linkClasses = "nav-link h2";
  if (path === location.pathname) {
    linkClasses += " active";
  }

  return (
    <li className="nav-item">
      <Link className={linkClasses} to={path}>
        {content}
      </Link>
    </li>
  );
};

function Navbar() {
  const [logoClickCount, setLogoClickCount] = useState(0);
  let navigate = useNavigate();

  const handleLogoClick = () => {
    if (logoClickCount >= 5) {
      setLogoClickCount(0);
      navigate("/kitty");
    } else {
      setLogoClickCount(logoClickCount + 1);
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-sm rounded-bottom shadow bg-primary">
        <span onClick={handleLogoClick} className="navbar-brand m-0 h1">
          <img
            src="src/assets/ShopBlockIcon_small.png"
            width="40"
            height="40"
            className="d-inline-block align-center ms-2 me-2"
          />
          BE Web Portal
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
        </button>
        <div className="collapse navbar-collapse" id="navebarNav">
          <div className="ms-auto">
            <ul className="navbar-nav">
              <NavLink path="/items" content="Items" />
              <NavLink path="/players" content="Players" />
              <NavLink path="/servershops" content="Server Shops" />
              <NavLink path="/auctions" content="Auctions" />
              <NavLink
                path="/settings"
                content={<i className="bi bi-gear" />}
              />
              <NavLink
                path="https://github.com/Brighter-Economy/BrighterEconomy"
                content={<i className="bi bi-github" />}
              />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
