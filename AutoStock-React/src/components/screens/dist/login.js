"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
//template from https://mui.com/getting-started/templates/
var React = require("react");
var Avatar_1 = require("@mui/material/Avatar");
var Button_1 = require("@mui/material/Button");
var CssBaseline_1 = require("@mui/material/CssBaseline");
var TextField_1 = require("@mui/material/TextField");
var FormControlLabel_1 = require("@mui/material/FormControlLabel");
var Checkbox_1 = require("@mui/material/Checkbox");
var Link_1 = require("@mui/material/Link");
var Paper_1 = require("@mui/material/Paper");
var Box_1 = require("@mui/material/Box");
var Grid_1 = require("@mui/material/Grid");
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
var Typography_1 = require("@mui/material/Typography");
var styles_1 = require("@mui/material/styles");
var firebase_wrapper_1 = require("../../services/firebase-wrapper");
function Copyright(props) {
    return (React.createElement(Typography_1["default"], __assign({ variant: "body2", color: "text.secondary", align: "center" }, props),
        "Copyright ©Autostock ",
        React.createElement(Link_1["default"], { color: "inherit", href: "https://localhost:8000/" }, "Autostock"),
        " ",
        new Date().getFullYear(),
        "."));
}
var theme = styles_1.createTheme();
function SignInSide() {
    var _a = React.useState(""), email = _a[0], setEmail = _a[1];
    var _b = React.useState(""), password = _b[0], setPassword = _b[1];
    var app = firebase_wrapper_1.InitializeApp();
    var auth = firebase_wrapper_1.GetAuth(app);
    var provider = firebase_wrapper_1.googleAuthProvider();
    var emailSignIn = function () {
        firebase_wrapper_1.SignInWithEmailAndPassword(auth, email, password);
    };
    var googleSignIn = function () {
        firebase_wrapper_1.SignInWithPopup(auth, provider);
    };
    var handleSubmit = function (event) {
        var _a, _b;
        event.preventDefault();
        var data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        var info = {
            email: (_a = data.get("email")) === null || _a === void 0 ? void 0 : _a.toString(),
            password: (_b = data.get("password")) === null || _b === void 0 ? void 0 : _b.toString()
        };
        setEmail(info.email);
        setPassword(info.password);
        emailSignIn();
    };
    return (React.createElement(styles_1.ThemeProvider, { theme: theme },
        React.createElement(Grid_1["default"], { container: true, component: "main", sx: { height: "100vh" } },
            React.createElement(CssBaseline_1["default"], null),
            React.createElement(Grid_1["default"], { item: true, xs: false, sm: 4, md: 7, sx: {
                    // backgroundImage: "url(https://source.unsplash.com/random)",
                    backgroundColor: "#2B2A2A",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                } },
                React.createElement(Box_1["default"], { display: "block", justifyContent: "center", alignItems: "center" },
                    React.createElement("div", { style: {
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10em",
                            textAlign: "center",
                            width: "100%"
                        } },
                        React.createElement("h1", { style: { fontSize: "5em", color: "#FFFFFF" } }, "AUTO"),
                        React.createElement("h1", { style: { fontSize: "5em", color: "#059A76" } }, "STOCK")),
                    React.createElement("div", { style: {
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "100%"
                        } },
                        React.createElement("h6", { style: { color: "#FFFFFF" } }, "An Algo-Trading Platform.")))),
            React.createElement(Grid_1["default"], { item: true, xs: 12, sm: 8, md: 5, component: Paper_1["default"], elevation: 6, square: true },
                React.createElement(Box_1["default"], { sx: {
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    } },
                    React.createElement(Avatar_1["default"], { sx: { m: 1, bgcolor: "secondary.main" } }),
                    React.createElement(Typography_1["default"], { component: "h1", variant: "h5" }, "Sign in"),
                    React.createElement(Button_1["default"], { onClick: function () {
                            googleSignIn();
                        } }, "Sign in with Google"),
                    React.createElement(Box_1["default"], { component: "form", noValidate: true, onSubmit: handleSubmit, sx: { mt: 1 } },
                        React.createElement(TextField_1["default"], { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true }),
                        React.createElement(TextField_1["default"], { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password" }),
                        React.createElement(FormControlLabel_1["default"], { control: React.createElement(Checkbox_1["default"], { value: "remember", color: "primary" }), label: "Remember me" }),
                        React.createElement(Button_1["default"], { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 } }, "Sign In"),
                        React.createElement(Grid_1["default"], { container: true },
                            React.createElement(Grid_1["default"], { item: true, xs: true },
                                React.createElement(Link_1["default"], { href: "#", variant: "body2" }, "Forgot password?")),
                            React.createElement(Grid_1["default"], { item: true },
                                React.createElement(Link_1["default"], { href: "/app/createaccount", variant: "body2" }, "Don't have an account? Sign Up"))),
                        React.createElement(Copyright, { sx: { mt: 5 } })))))));
}
exports["default"] = SignInSide;
