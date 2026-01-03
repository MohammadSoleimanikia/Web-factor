import { SearchIcon } from "lucide-react";
import { Link } from "react-router";

import { Button } from "../ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "../ui/input-group";

export default function Header() {
    return (
        <header className="mx-5">
            <h1 className="title">فاکتور ها</h1>
            <div className="flex justify-between gap-3">
                <Button asChild>
                    <Link to="/invoices/new">افزودن فاکتور</Link>
                </Button>
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
            </div>
        </header>
    );
}
