import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Label } from "@/features/shared/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/features/shared/components/ui/select";
import { PLACEHOLDERS } from "@/features/shared/constants/i18n";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    options: SelectOption[];
    placeholder?: string;
}

/**
 * Reusable select field component
 * Eliminates duplication of select-controller rendering logic
 */
export function SelectField<T extends FieldValues>({
    control,
    name,
    label,
    options,
    placeholder = PLACEHOLDERS.SELECT,
}: SelectFieldProps<T>) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
}
