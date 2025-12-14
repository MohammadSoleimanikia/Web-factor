import { SearchIcon } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { Link } from "react-router";

export default function Header() {
    return (
        <header className="mx-5">
            <h1 className="title">فاکتور ها</h1>
            <div className="flex justify-between gap-3">
                {/* search btn */}
                <InputGroup>
                    <InputGroupInput placeholder="جستجو..." />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton>جستجو</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
                <Button asChild>
                    <Link to="/invoices/new">افزودن فاکتور</Link>
                </Button>
            </div>
        </header>
    );
}
