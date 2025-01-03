"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var Button_1 = require("react-bootstrap/Button");
var Modal_1 = require("react-bootstrap/Modal");
var react_router_dom_1 = require("react-router-dom");
var BasicTable_1 = require("./BasicTable");
var TypeDisplay = function (_a) {
    var typeName = _a.typeName;
    if (typeName === "MODIFY") {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("i", { className: "bi bi-pencil-fill" }),
            react_1["default"].createElement("span", { className: "fst-italic" }, " MODIFY")));
    }
    else if (typeName === "TRANSFER") {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("i", { className: "bi bi-arrow-left-right" }),
            react_1["default"].createElement("span", { className: "fst-italic" }, " TRANSFER")));
    }
    else if (typeName === "PURCHASE") {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("i", { className: "bi bi-bank2" }),
            react_1["default"].createElement("span", { className: "fst-italic" }, " PURCHASE")));
    }
};
var DataRow = function (_a) {
    var transaction = _a.transaction;
    if (transaction.nameFrom) {
        return (react_1["default"].createElement("tr", null,
            react_1["default"].createElement("td", null,
                react_1["default"].createElement(TypeDisplay, { typeName: transaction.type })),
            react_1["default"].createElement("td", null, new Date(transaction.timestamp * 1000).toLocaleString()),
            react_1["default"].createElement("td", null, transaction.nameTo),
            react_1["default"].createElement("td", null, transaction.nameFrom),
            react_1["default"].createElement("td", null, transaction.money)));
    }
    else {
        return (react_1["default"].createElement("tr", { className: "table-warning" },
            react_1["default"].createElement("td", null,
                react_1["default"].createElement(TypeDisplay, { typeName: transaction.type })),
            react_1["default"].createElement("td", null, new Date(transaction.timestamp * 1000).toLocaleString()),
            react_1["default"].createElement("td", null, transaction.nameTo),
            react_1["default"].createElement("td", null,
                react_1["default"].createElement("span", { className: "fst-italic" }, "SERVER")),
            react_1["default"].createElement("td", null, transaction.money)));
    }
};
var PlayerAccountModal = function (_a) {
    var shouldShow = _a.shouldShow, onClose = _a.onClose, playerAccount = _a.playerAccount;
    var navigate = react_router_dom_1.useNavigate();
    var _b = react_1.useState(), transactions = _b[0], setTransactions = _b[1];
    var _c = playerAccount(), uuid = _c.uuid, username = _c.username, money = _c.money, locked = _c.locked;
    var updateTransactions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var transactionsJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/transactions/" + uuid + "?limit=5&sort=desc").then(function (response) { return response.json(); })];
                case 1:
                    transactionsJson = _a.sent();
                    setTransactions(transactionsJson);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        updateTransactions();
    }, [uuid]);
    var TransactionRows = function () { var _a; return (_a = transactions === null || transactions === void 0 ? void 0 : transactions.map(function (transaction) { return (react_1["default"].createElement(DataRow, { key: transaction.id, transaction: transaction })); })) !== null && _a !== void 0 ? _a : []; };
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
                                    react_1["default"].createElement("input", { type: "text", className: "form-control", placeholder: "Locked", disabled: true }))),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement(Button_1["default"], { variant: "primary", className: "w-100", onClick: function () { return navigate("/" + uuid); } }, "Open Player Details")))),
                    react_1["default"].createElement("div", { className: "d-flex" },
                        react_1["default"].createElement("h5", { className: "me-auto align-bottom" },
                            react_1["default"].createElement("i", null, "Last 5 Transactions"))),
                    react_1["default"].createElement(BasicTable_1["default"], { headers: ["Type", "Timestamp", "To", "From", "Amount"], rows: TransactionRows() })))),
        react_1["default"].createElement(Modal_1["default"].Footer, null,
            react_1["default"].createElement(Button_1["default"], { variant: "danger", onClick: onClose }, "Close"),
            react_1["default"].createElement(Button_1["default"], { variant: "primary" }, "Save"))));
};
exports["default"] = PlayerAccountModal;
