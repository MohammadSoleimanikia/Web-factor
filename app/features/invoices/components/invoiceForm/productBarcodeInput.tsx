// features/invoices/components/InvoiceForm/ProductBarcodeInput.tsx
import { useState } from "react";
import { toast } from "sonner";

import type { Product } from "@/features/products/types/product";
import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";

interface ProductBarcodeInputProps {
    products: Product[];
    onProductAdd: (product: Product) => void;
}

export default function ProductBarcodeInput({
    products,
    onProductAdd,
}: ProductBarcodeInputProps) {
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
            <Label htmlFor="barcode">انتخاب کالا با بارکد</Label>
            <Input
                autoFocus
                type="text"
                id="barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={handleBarcodeSubmit}
                placeholder="بارکد رو وارد کن"
            />
        </div>
    );
}
