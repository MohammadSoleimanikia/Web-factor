import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { useHasActiveSubscription } from "@/features/subscription/hooks/useSubscription";

import { Button } from "../../shared/components/ui/button";
import {
    InputGroup,
    InputGroupButton,
    InputGroupInput,
} from "../../shared/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../shared/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../shared/components/ui/tooltip";

export default function Header({
    setSearchQuery,
    setStatus,
}: {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [searchInput, setSearchInput] = useState("");
    const { hasAccess } = useHasActiveSubscription();

    const handleSearch = () => setSearchQuery(searchInput);
    const handleReset = () => {
        setSearchInput("");
        setSearchQuery("");
    };

    return (
        <header className="mx-5 space-y-4">
            <h1 className="text-right text-2xl font-bold">فاکتور ها</h1>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            <Button
                                asChild={hasAccess}
                                disabled={!hasAccess}
                                className="whitespace-nowrap"
                            >
                                {hasAccess ? (
                                    <Link to="/invoices/new">
                                        افزودن فاکتور
                                    </Link>
                                ) : (
                                    <span>افزودن فاکتور</span>
                                )}
                            </Button>
                        </span>
                    </TooltipTrigger>
                    {!hasAccess && (
                        <TooltipContent>
                            برای ایجاد فاکتور ابتدا اشتراک تهیه کنید
                        </TooltipContent>
                    )}
                </Tooltip>

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
                            <InputGroupButton onClick={handleReset}>
                                <XIcon className="w-4 h-4" />
                            </InputGroupButton>
                        )}
                    </InputGroup>
                </div>
            </div>
        </header>
    );
}
