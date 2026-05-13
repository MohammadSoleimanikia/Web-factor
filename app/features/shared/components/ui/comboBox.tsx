"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/features/shared/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/features/shared/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/features/shared/components/ui/popover";
import { cn } from "@/lib/utils";

type ComboItem = {
    value: string;
    label: string;
};

type ComboboxProps = {
    items: ComboItem[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    className?: string;
};

export function Combobox({
    items,
    value,
    onChange,
    placeholder = "انتخاب کنید...",
    searchPlaceholder = "جستجو...",
    emptyText = "موردی پیدا نشد",
    className,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between", className)}
                >
                    {value
                        ? items.find((i) => i.value === value)?.label
                        : placeholder}
                    <ChevronsUpDownIcon className="ms-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>{emptyText}</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "me-2 h-4 w-4",
                                            value === item.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
