import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Chatwindow from "./pages/components/Chatwindow";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Helmet>
            <link rel="icon" href={require("./assets/logo.png")} />
            <title>Messaging App</title>
        </Helmet>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chat/:user_id" element={<Chat />}>
                    <Route path=":id" element={<Chatwindow />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
);
