import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";

interface FormFieldProps {
    label: string;
    children: ReactNode;
    htmlFor?: string;
}

/**
 * Wrapper component for form fields with label
 */
export function FormField({ label, children, htmlFor }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={htmlFor}>{label}</Label>
            {children}
        </div>
    );
}

interface TextInputFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    registration: UseFormRegisterReturn;
}

/**
 * Wrapper for text input fields with label
 */
export function TextInputField({
    label,
    registration,
    ...props
}: TextInputFieldProps) {
    return (
        <FormField label={label}>
            <Input {...registration} {...props} />
        </FormField>
    );
}

interface FormSectionProps {
    title: string;
    children: ReactNode;
    className?: string;
}

/**
 * Section wrapper for grouping form fields
 */
export function FormSection({
    title,
    children,
    className = "space-y-4",
}: FormSectionProps) {
    return (
        <div className={className}>
            <h2 className="text-lg font-semibold">{title}</h2>
            {children}
        </div>
    );
}

interface FormActionsProps {
    children: ReactNode;
    className?: string;
}

/**
 * Wrapper for form action buttons
 */
export function FormActions({
    children,
    className = "flex gap-2",
}: FormActionsProps) {
    return <div className={className}>{children}</div>;
}
