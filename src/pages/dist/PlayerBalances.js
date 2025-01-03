"use strict";
exports.__esModule = true;
var PlayerBalancesTable_1 = require("../components/PlayerBalancesTable");
function PlayerBalances() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "pt-3 ps-3 pe-3 d-flex" },
            React.createElement("h1", { className: "display-6 w-100" }, "Player Information"),
            React.createElement("div", { className: "input-group input-group me-3" },
                React.createElement("input", { type: "text", className: "form-control", placeholder: "User Search" }),
                React.createElement("span", { className: "input-group-text", id: "basic-addon2" },
                    React.createElement("i", { className: "bi bi-search" }))),
            React.createElement("button", { type: "button", className: "btn btn-primary ms-auto" }, "Refresh")),
        React.createElement("div", { className: "p-3" },
            React.createElement(PlayerBalancesTable_1["default"], null))));
}
exports["default"] = PlayerBalances;
