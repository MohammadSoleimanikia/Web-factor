import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";

export default function Header() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        aboutSection?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <header className=" container mx-auto flex justify-between items-center  pt-2 h-16">
            <Link to={"/"}>
                <img className="size-16" src="logo.png" alt="invoice logo" />
            </Link>
            <div>
                <NavLink to={"/dashboard"} >
                    <Button >ورود/عضویت</Button>
                </NavLink>
                <Button
                    onClick={scrollToAbout}
                    className="  mr-2"
                    variant={"outline"}
                >
                    درباره فاکتور ساز
                </Button>
            </div>
        </header>
    );
}
