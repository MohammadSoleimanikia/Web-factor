import { Link } from "react-router";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <header className=" container mx-auto flex justify-between items-center sm:px-5 pt-2 h-16">
            <Link to={"/"}>
                <img className="size-16" src="logo.png" alt="invoice logo" />
            </Link>
            <div>
                <Button className=" ">ورود/عضویت</Button>
                <Button className="  mr-2" variant={"outline"}>
                    درباره فاکتور ساز
                </Button>
            </div>
        </header>
    );
}
