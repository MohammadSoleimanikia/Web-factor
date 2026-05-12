import { SearchIcon } from "lucide-react";
import { useState } from "react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "../../../components/ui/input-group";
import AddProductModal from "./addProductModal";

export default function Header({
    setSearchQuery,
}: {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [searchInput, setSearchInput] = useState("");
    return (
        <header className="mx-5">
            <h1 className="title">کالا ها</h1>
            <div className="flex justify-between gap-3">
                <AddProductModal />
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
