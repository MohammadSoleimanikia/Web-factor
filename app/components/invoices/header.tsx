import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { Button } from "../ui/button";
import {
    InputGroup,
    InputGroupButton,
    InputGroupInput,
} from "../ui/input-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export default function Header({
    setSearchQuery,
    setStatus,
}: {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => setSearchQuery(searchInput);
    const handleReset = () => {
        setSearchInput("");
        setSearchQuery("");
    };

    return (
        <header className="mx-5 space-y-4">
            <h1 className="text-right text-2xl font-bold">فاکتور ها</h1>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <Button asChild className="whitespace-nowrap">
                    <Link to="/invoices/new">افزودن فاکتور</Link>
                </Button>

                <div className="flex flex-wrap items-center gap-3">
                    <Select
                        defaultValue="all"
                        onValueChange={(value) => setStatus(value)}
                    >
                        <SelectTrigger className="w-48 text-right" dir="rtl">
                            <SelectValue placeholder="وضعیت پرداخت" />
                        </SelectTrigger>

                        <SelectContent dir="rtl" position="popper">
                            <SelectGroup>
                                <SelectLabel className="text-right text-muted-foreground">
                                    وضعیت
                                </SelectLabel>

                                <SelectItem value="paid" className="text-right">
                                    پرداخت شده
                                </SelectItem>
                                <SelectItem
                                    value="pending"
                                    className="text-right"
                                >
                                    در انتظار پرداخت
                                </SelectItem>
                                <SelectItem value="all" className="text-right">
                                    همه فاکتور ها
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <InputGroup className="w-64 px-1">
                        <InputGroupInput
                            placeholder="جستجو بر اساس نام مشتری"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="text-right"
                        />

                        <InputGroupButton
                            onClick={handleSearch}
                            className="bg-primary text-primary-foreground"
                        >
                            <SearchIcon className="w-4 h-4" />
                        </InputGroupButton>

                        {searchInput && (
                            <InputGroupButton
                                onClick={handleReset}
                                
                            >
                                <XIcon className="w-4 h-4" />
                            </InputGroupButton>
                        )}
                    </InputGroup>
                </div>
            </div>
        </header>
    );
}
