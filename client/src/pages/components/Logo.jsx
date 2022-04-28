import logo from "../../assets/logo.png";

function Logo() {
    return (
        <section className="flex gap-2 text-2xl font-bold mb-12">
            <img src={logo} alt="App Logo" className="h-8" />
            Messaging App
        </section>
    );
}

export default Logo;
