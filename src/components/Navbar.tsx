import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import shopBlockIconUrl from "../assets/ShopBlockIcon.png";

interface NavLinkParams {
  path: string;
  content: any;
}

const NavbarLink: React.FC<NavLinkParams> = ({ path, content }) => {
  const location = useLocation();

  var linkClasses = "nav-link h2";
  if (path === location.pathname) {
    linkClasses += " active";
  }

  return (
    <li className="nav-item">
      <NavLink className={linkClasses} to={path}>
        {content}
      </NavLink>
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
            src={shopBlockIconUrl}
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
              <NavbarLink path="/items" content="Items" />
              <NavbarLink path="/players" content="Players" />
              <NavbarLink path="/servershops" content="Shops" />
              <NavbarLink path="/auctions" content="Auctions" />
              <NavbarLink
                path="/settings"
                content={<i className="bi bi-gear" />}
              />
              <NavbarLink
                path="https://github.com/Brighter-Economy"
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
