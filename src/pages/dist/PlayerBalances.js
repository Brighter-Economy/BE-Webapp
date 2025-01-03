"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PlayerBalancesTable_1 = require("../components/PlayerBalancesTable");
function PlayerBalances() {
    var _a = react_1.useState(""), searchQuery = _a[0], setSearchQuery = _a[1];
    var _b = react_1.useState(false), isLocked = _b[0], setIsLocked = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "pt-3 ps-3 pe-3 d-flex" },
            React.createElement("div", { className: "container-fluid" },
                React.createElement("h1", { className: "display-6 w-100" }, "Player Information"),
                React.createElement("div", { className: "form-check form-switch me-3 w-100" },
                    React.createElement("input", { type: "checkbox", className: "form-check-input", id: "lockedFilter", checked: isLocked, onChange: function (e) { return setIsLocked(e.target.checked); } }),
                    React.createElement("span", null, "Show Locked Accounts"))),
            React.createElement("div", { className: "d-flex ms-3 my-auto container-fluid" },
                React.createElement("div", { className: "input-group input-group ms-auto me-3", style: { height: 50 } },
                    React.createElement("input", { type: "text", className: "form-control", placeholder: "User Search", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); } }),
                    React.createElement("span", { className: "input-group-text", id: "basic-addon2" },
                        React.createElement("i", { className: "bi bi-search" }))),
                React.createElement("button", { type: "button", className: "btn btn-primary ms-auto", style: {
                        backgroundColor: "#0d47a1",
                        borderWidth: "0",
                        height: 50
                    } }, "Refresh"))),
        React.createElement("div", { className: "p-3" },
            React.createElement(PlayerBalancesTable_1["default"], { searchQuery: searchQuery, isLocked: isLocked }))));
}
exports["default"] = PlayerBalances;
