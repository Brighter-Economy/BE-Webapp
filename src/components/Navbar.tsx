import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navClass = (path: string) => {
    return path === location.pathname ? "nav-link h2 active" : "nav-link h2";
  };

  return (
    <>
      <nav
        className="navbar navbar-dark navbar-expand-sm rounded-bottom"
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
              <li className="nav-item">
                <Link className={navClass("/items")} to="/items">
                  Items
                </Link>
              </li>
              <li className="nav-item">
                <Link className={navClass("/players")} to="/players">
                  Player Balances
                </Link>
              </li>
              <li className="nav-item">
                <Link className={navClass("/servershops")} to="/servershops">
                  Server Shops
                </Link>
              </li>
              <li className="nav-item">
                <Link className={navClass("/auctions")} to="/auctions">
                  Auctions
                </Link>
              </li>
              <li className="nav-item">
                <Link className={navClass("/settings")} to="/settings">
                  <i className="bi bi-gear" />
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="https://github.com/Brighter-Economy/BrighterEconomy"
                >
                  <i className="bi bi-github" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
