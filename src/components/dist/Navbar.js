"use strict";
exports.__esModule = true;
require("bootstrap-icons/font/bootstrap-icons.css");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var NavLink = function (_a) {
    var path = _a.path, content = _a.content;
    var location = react_router_dom_1.useLocation();
    var linkClasses = "nav-link h2";
    if (path === location.pathname) {
        linkClasses += " active";
    }
    return (React.createElement("li", { className: "nav-item" },
        React.createElement(react_router_dom_1.Link, { className: linkClasses, to: path }, content)));
};
function Navbar() {
    var _a = react_1.useState(0), logoClickCount = _a[0], setLogoClickCount = _a[1];
    var navigate = react_router_dom_1.useNavigate();
    var handleLogoClick = function () {
        if (logoClickCount >= 5) {
            setLogoClickCount(0);
            navigate("/kitty");
        }
        else {
            setLogoClickCount(logoClickCount + 1);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: "navbar navbar-dark navbar-expand-sm rounded-bottom shadow bg-primary" },
            React.createElement("span", { onClick: handleLogoClick, className: "navbar-brand m-0 h1" },
                React.createElement("img", { src: "src/assets/ShopBlockIcon_small.png", width: "40", height: "40", className: "d-inline-block align-center ms-2 me-2" }),
                "BE Web Portal"),
            React.createElement("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarNav", "aria-controls": "navbarNav", "aria-expanded": "false", "aria-label": "Toggle navigation" }, "Menu"),
            React.createElement("div", { className: "collapse navbar-collapse", id: "navebarNav" },
                React.createElement("div", { className: "ms-auto" },
                    React.createElement("ul", { className: "navbar-nav" },
                        React.createElement(NavLink, { path: "/items", content: "Items" }),
                        React.createElement(NavLink, { path: "/players", content: "Players" }),
                        React.createElement(NavLink, { path: "/servershops", content: "Server Shops" }),
                        React.createElement(NavLink, { path: "/auctions", content: "Auctions" }),
                        React.createElement(NavLink, { path: "/settings", content: React.createElement("i", { className: "bi bi-gear" }) }),
                        React.createElement(NavLink, { path: "https://github.com/Brighter-Economy/BrighterEconomy", content: React.createElement("i", { className: "bi bi-github" }) })))))));
}
exports["default"] = Navbar;
