// import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
    return (
        <div className="flex flex-col gap-2 underline font-bold p-20">
            {/* Sitemap */}
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
            <Link to="/chat">Chat</Link>
            <Outlet />
        </div>
    );
}

export default App;
