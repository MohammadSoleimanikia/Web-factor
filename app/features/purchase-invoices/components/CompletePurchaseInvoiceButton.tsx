// app/features/purchase-invoices/components/CompletePurchaseInvoiceButton.tsx
import { CheckCircle } from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";

import { useCompletePurchaseInvoice } from "../hooks/useCompletePurchaseInvoice";

type CompletePurchaseInvoiceButtonProps = {
    id: string;
    variant?: "default" | "ghost" | "outline";
    size?: "default" | "sm" | "lg" | "icon";
};

export function CompletePurchaseInvoiceButton({
    id,
    variant = "ghost",
    size = "sm",
}: CompletePurchaseInvoiceButtonProps) {
    const { mutateAsync, isPending } = useCompletePurchaseInvoice();

    const handleComplete = async () => {
        const confirmed = window.confirm(
            "آیا از تکمیل این فاکتور خرید مطمئن هستید؟",
        );

        if (!confirmed) return;

        await mutateAsync(id);
    };

    return (
        <Button
            type="button"
            variant={variant}
            size={size}
            disabled={isPending}
            onClick={handleComplete}
            className="text-green-700 hover:text-green-800"
        >
            <CheckCircle className="h-4 w-4 ml-1" />
            تکمیل
        </Button>
    );
}