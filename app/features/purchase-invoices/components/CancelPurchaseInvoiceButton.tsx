// app/features/purchase-invoices/components/CancelPurchaseInvoiceButton.tsx
import { XCircle } from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";

import { useCancelPurchaseInvoice } from "../hooks/useCancelPurchaseInvoice";

type CancelPurchaseInvoiceButtonProps = {
    id: string;
    variant?: "default" | "ghost" | "outline" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
};

export function CancelPurchaseInvoiceButton({
    id,
    variant = "ghost",
    size = "sm",
}: CancelPurchaseInvoiceButtonProps) {
    const { mutateAsync, isPending } = useCancelPurchaseInvoice();

    const handleCancel = async () => {
        const confirmed = window.confirm(
            "آیا از لغو این فاکتور خرید مطمئن هستید؟",
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
            onClick={handleCancel}
            className="text-red-600 hover:text-red-700"
        >
            <XCircle className="h-4 w-4 ml-1" />
            لغو
        </Button>
    );
}