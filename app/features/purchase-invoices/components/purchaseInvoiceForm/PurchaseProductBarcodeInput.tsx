// app/features/purchase-invoices/components/purchaseInvoiceForm/PurchaseProductBarcodeInput.tsx
import { useState } from "react";
import { toast } from "sonner";

import type { Product } from "@/features/products/types/product";
import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";

type PurchaseProductBarcodeInputProps = {
    products: Product[];
    onProductAdd: (product: Product) => void;
};

export default function PurchaseProductBarcodeInput({
    products,
    onProductAdd,
}: PurchaseProductBarcodeInputProps) {
    const [barcode, setBarcode] = useState("");

    const handleBarcodeSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;

        e.preventDefault();

        const code = barcode.trim();
        if (!code) return;

        const product = products.find((p) => p.barcode === code);

        if (!product) {
            toast.error("محصولی با این بارکد پیدا نشد");
            return;
        }

        onProductAdd(product);
        setBarcode("");
    };

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="purchase-product-barcode">
                انتخاب کالا با بارکد
            </Label>
            <Input
                id="purchase-product-barcode"
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={handleBarcodeSubmit}
                placeholder="بارکد را وارد کن و Enter بزن"
            />
        </div>
    );
}