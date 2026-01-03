import { SearchIcon } from "lucide-react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "../ui/input-group";
import AddCustomerModal from "./addCustomerModal";

export default function Header({ onAdded }: { onAdded: () => void }) {
    return (
        <header className="mx-5">
            <h1 className="title">مشتریان</h1>
            <div className="flex justify-between gap-3">
                <AddCustomerModal onAdded={onAdded} />
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
