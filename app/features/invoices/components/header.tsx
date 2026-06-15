// features/invoices/components/header.tsx
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
    const [customerName, setCustomerName] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const { hasAccess } = useHasActiveSubscription();

    // ✅ فقط وقتی دکمه جستجو کلیک شود، سرچ را اجرا کن
    const handleSearch = () => {
        // ساخت query string برای API
        const searchParts = [];
        if (customerName.trim()) {
            searchParts.push(
                `customer=${encodeURIComponent(customerName.trim())}`,
            );
        }
        if (invoiceNumber.trim()) {
            searchParts.push(
                `invoice=${encodeURIComponent(invoiceNumber.trim())}`,
            );
        }
        setSearchQuery(searchParts.join("&"));
    };

    const handleReset = () => {
        setCustomerName("");
        setInvoiceNumber("");
        setSearchQuery("");
    };

    // ✅ کلیک Enter
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <header className="mx-5 mb-5 space-y-4">
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
                    {/* فیلتر وضعیت */}
                    <Select
                        defaultValue="all"
                        onValueChange={(value) => setStatus(value)}
                    >
                        <SelectTrigger className="w-40 text-right" dir="rtl">
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

                    {/* جستجو بر اساس نام مشتری */}
                    <InputGroup className="w-64">
                        <InputGroupInput
                            placeholder="نام مشتری..."
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="text-right"
                        />
                        {customerName && (
                            <InputGroupButton
                                onClick={() => setCustomerName("")}
                            >
                                <XIcon className="w-4 h-4" />
                            </InputGroupButton>
                        )}
                        <InputGroupButton
                            onClick={handleSearch}
                            className="bg-primary text-primary-foreground"
                        >
                            <SearchIcon className="w-4 h-4" />
                        </InputGroupButton>
                    </InputGroup>

                    {/* جستجو بر اساس شماره فاکتور */}
                    <InputGroup className="w-56">
                        <InputGroupInput
                            placeholder="شماره فاکتور..."
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="text-left"
                            dir="ltr"
                        />
                        {invoiceNumber && (
                            <InputGroupButton
                                onClick={() => setInvoiceNumber("")}
                            >
                                <XIcon className="w-4 h-4" />
                            </InputGroupButton>
                        )}
                        <InputGroupButton
                            onClick={handleSearch}
                            className="bg-primary text-primary-foreground"
                        >
                            <SearchIcon className="w-4 h-4" />
                        </InputGroupButton>
                    </InputGroup>

                    {/* دکمه ریست */}
                    {(customerName || invoiceNumber) && (
                        <Button variant="ghost" onClick={handleReset} size="sm">
                            پاک کردن همه
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
