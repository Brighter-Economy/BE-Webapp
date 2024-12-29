import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation } from "react-router-dom";

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
  return (
    <>
      <nav
        className="navbar navbar-dark navbar-expand-sm rounded-bottom shadow"
        style={{ backgroundColor: "#0d47a1" }}
      >
        <a href="#" className="navbar-brand m-0 h1">
          <img
            src="src/assets/ShopBlockIcon_small.png"
            width="40"
            height="40"
            className="d-inline-block align-center ms-2 me-2"
          />
          BE Web Portal
        </a>
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
