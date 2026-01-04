import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { Button } from "../ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "../ui/input-group";

export default function Header({
    setSearchQuery,
}: {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [searchInput, setSearchInput] = useState("");
    return (
        <header className="mx-5">
            <h1 className="title">فاکتور ها</h1>
            <div className="flex justify-between gap-3">
                <Button asChild>
                    <Link to="/invoices/new">افزودن فاکتور</Link>
                </Button>
                {/* search btn */}
                <InputGroup>
                    <InputGroupInput
                        placeholder="جستجو..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            className="ml-2"
                            onClick={() => setSearchQuery(searchInput)}
                        >
                            <SearchIcon />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </header>
    );
}
