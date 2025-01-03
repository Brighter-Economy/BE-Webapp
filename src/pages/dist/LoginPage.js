"use strict";
exports.__esModule = true;
var react_bootstrap_1 = require("react-bootstrap");
function LoginPage() {
    var serverIp = "smp.example.net";
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex-row align-items-center mt-5" },
            React.createElement("div", { className: "container rounded-4 shadow-lg border border-4 border-primary", style: { width: 500 } },
                React.createElement("h1", { className: "display-3 text-center" }, "Login"),
                React.createElement("div", { className: "" },
                    React.createElement("img", { className: "img-fluid", src: "src/assets/ShopBlockIcon.png" })),
                React.createElement("p", { className: "fst-italic fs-5 text-secondary text-center" },
                    "Server IP: ",
                    serverIp),
                React.createElement("div", { className: "input-group mb-3" },
                    React.createElement("span", { className: "input-group-text", id: "basic-addon1" }, "User"),
                    React.createElement("input", { type: "text", className: "form-control", placeholder: "Minecraft Username", "aria-label": "Username", "aria-describedby": "basic-addon1" })),
                React.createElement("div", null,
                    React.createElement("div", { className: "input-group mb-3" },
                        React.createElement("span", { className: "input-group-text", id: "basic-addon2" }, "Password"),
                        React.createElement("input", { type: "password", className: "form-control", placeholder: "BrighterEconomy Password", "aria-label": "Password", "aria-describedby": "basic-addon2" })),
                    React.createElement("div", { className: "" },
                        React.createElement(react_bootstrap_1.Button, { className: "btn-lg w-100 mb-3" }, "Login")))))));
}
exports["default"] = LoginPage;
