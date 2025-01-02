"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Button_1 = require("react-bootstrap/Button");
var Modal_1 = require("react-bootstrap/Modal");
var DataRow = function (_a) {
    var type = _a.type, datetime = _a.datetime, to = _a.to, from = _a.from, amount = _a.amount;
    return (react_1["default"].createElement("tr", null,
        react_1["default"].createElement("td", null,
            react_1["default"].createElement("i", { className: "bi bi-arrow-left-right" }),
            react_1["default"].createElement("span", { className: "fst-italic" }, " " + type)),
        react_1["default"].createElement("td", null, new Date(datetime * 1000).toLocaleString()),
        react_1["default"].createElement("td", null, to),
        react_1["default"].createElement("td", null, from),
        react_1["default"].createElement("td", null, amount)));
};
var PlayerAccountModal = function (_a) {
    var shouldShow = _a.shouldShow, onClose = _a.onClose, playerAccount = _a.playerAccount;
    var _b = playerAccount(), uuid = _b.uuid, username = _b.username, money = _b.money, locked = _b.locked;
    return (react_1["default"].createElement(Modal_1["default"], { show: shouldShow(), onHide: onClose, backdrop: "static", keyboard: true, className: "modal-lg" },
        react_1["default"].createElement(Modal_1["default"].Header, { closeButton: true },
            react_1["default"].createElement(Modal_1["default"].Title, null, username)),
        react_1["default"].createElement(Modal_1["default"].Body, null,
            react_1["default"].createElement("div", { className: "rounded shadow d-flex" },
                react_1["default"].createElement("div", { className: "w-100 ms-2" },
                    react_1["default"].createElement("div", { className: "d-flex" },
                        react_1["default"].createElement("img", { src: "https://mc-heads.net/head/" + uuid, className: "rounded pe-4" }),
                        react_1["default"].createElement("div", { className: "my-auto" },
                            react_1["default"].createElement("div", { className: "input-group mb-2" },
                                react_1["default"].createElement("span", { className: "input-group-text" }, "UUID"),
                                react_1["default"].createElement("input", { type: "input-group-text", className: "form-control", disabled: true, placeholder: uuid })),
                            react_1["default"].createElement("div", { className: "d-flex mb-2" },
                                react_1["default"].createElement("div", { className: "input-group" },
                                    react_1["default"].createElement("span", { className: "input-group-text" }, "Username"),
                                    react_1["default"].createElement("input", { type: "input-group-text", className: "form-control", disabled: true, placeholder: username }))),
                            react_1["default"].createElement("div", { className: "d-flex mb-2" },
                                react_1["default"].createElement("div", { className: "input-group me-2" },
                                    react_1["default"].createElement("span", { className: "input-group-text" }, "Balance"),
                                    react_1["default"].createElement("input", { type: "input-group-text", className: "form-control", disabled: false, placeholder: money.toString() })),
                                react_1["default"].createElement("div", { className: "input-group" },
                                    react_1["default"].createElement("div", { className: "input-group-text" },
                                        react_1["default"].createElement("input", { className: "form-check-input mt-0", type: "checkbox", value: "", checked: locked })),
                                    react_1["default"].createElement("input", { type: "text", className: "form-control", placeholder: "Locked", disabled: true }))))),
                    react_1["default"].createElement("div", { className: "d-flex" },
                        react_1["default"].createElement("h5", { className: "me-auto align-bottom" },
                            react_1["default"].createElement("i", null, "Last 5 Transactions")),
                        react_1["default"].createElement("span", { className: "ms-auto align-bottom text-secondary" },
                            react_1["default"].createElement("i", null, uuid))),
                    react_1["default"].createElement("table", { className: "table table-dark table-hover rounded-2 overflow-hidden table-sm" },
                        react_1["default"].createElement("thead", null,
                            react_1["default"].createElement("tr", null,
                                react_1["default"].createElement("th", { scope: "col" }, "Type"),
                                react_1["default"].createElement("th", { scope: "col" }, "Timestamp"),
                                react_1["default"].createElement("th", { scope: "col" }, "To"),
                                react_1["default"].createElement("th", { scope: "col" }, "From"),
                                react_1["default"].createElement("th", { scope: "col" }, "Amount"))),
                        react_1["default"].createElement("tbody", null,
                            react_1["default"].createElement(DataRow, { type: "Transfer", datetime: 1735453443, to: "bright_spark", from: "CasualCynic", amount: "216" }),
                            react_1["default"].createElement(DataRow, { type: "Transfer", datetime: 1735457043, to: "bright_spark", from: "CasualCynic", amount: "572" }),
                            react_1["default"].createElement(DataRow, { type: "Transfer", datetime: 1735496643, to: "CasualCynic", from: "bright_spark", amount: "1100" }),
                            react_1["default"].createElement(DataRow, { type: "Transfer", datetime: 1736058243, to: "bright_spark", from: "CasualCynic", amount: "612" }),
                            react_1["default"].createElement(DataRow, { type: "Transfer", datetime: 1738131843, to: "CasualCynic", from: "bright_spark", amount: "516" })))))),
        react_1["default"].createElement(Modal_1["default"].Footer, null,
            react_1["default"].createElement(Button_1["default"], { variant: "danger", onClick: onClose }, "Close"),
            react_1["default"].createElement(Button_1["default"], { variant: "primary", style: {
                    backgroundColor: "#0d47a1",
                    borderWidth: "0"
                } }, "Understood"))));
};
exports["default"] = PlayerAccountModal;
