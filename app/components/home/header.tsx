import { Link, NavLink } from "react-router";

import { Button } from "@/features/shared/components/ui/button";

import ThemeToggler from "./themeToggler";

export default function Header() {
    return (
        <header className=" container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8  pt-4 h-16">
            <Link to={"/"}>
                <img className="size-32" src="logo.svg" alt="invoice logo" />
            </Link>
            <div className="flex items-center gap-3">
                <ThemeToggler />
                <Link to={"/demo"}>
                    <Button variant={"outline"}>دمو</Button>
                </Link>
                <NavLink to={"/dashboard"}>
                    <Button>ورود/عضویت</Button>
                </NavLink>
            </div>
        </header>
    );
}
