import { useState } from "react";
import { Helmet } from "react-helmet";
import Gif from "./components/Gif";
import Logo from "./components/Logo";

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div className="bg-gray-800 text-gray-200 h-screen px-60 py-28 flex justify-between">
            <Helmet>
                <title>Login | Messaging App</title>
            </Helmet>
            <section className="w-[45%] my-auto">
                <Logo />
                <h1 className="text-5xl text-[#FFB923] font-bold">
                    Welcome Back!!
                </h1>
                <Gif />
            </section>
            <form action="#" className="flex flex-col gap-8 w-[45%] my-auto">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-bold text-3xl">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-gray-800 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-white rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-[#FFB923] focus:ring-[#FFB923] focus:ring-1 sm:text-lg"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="What's your email?"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-bold text-3xl">
                        Password
                    </label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className="text-gray-800 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-white rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-[#FFB923] focus:ring-[#FFB923] focus:ring-1 sm:text-lg"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Shh..."
                        required
                    />
                </div>

                <input
                    type="submit"
                    value="Login"
                    className="bg-[#FFB923] text-black px-4 py-2 rounded-md font-bold text-2xl hover:bg-[#FFB923]/80"
                />
                <a
                    href="signup"
                    className="underline text-gray-500 text-center"
                >
                    Don't have an account? Sign Up!
                </a>
            </form>
        </div>
    );
}

export default Login;
