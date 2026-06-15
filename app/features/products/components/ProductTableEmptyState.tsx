// features/products/components/ProductTableEmptyState.tsx
import { Package } from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";

import AddProductModal from "./addProductModal";

interface ProductTableEmptyStateProps {
    hasSearch: boolean;
    searchQuery: string;
    onReset: () => void;
    hasAccess: boolean;
}

export function ProductTableEmptyState({
    hasSearch,
    searchQuery,
    onReset,
    hasAccess,
}: ProductTableEmptyStateProps) {
    if (!hasSearch) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg ">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Package className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                    هنوز کالایی ثبت نکرده‌اید
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                    اولین کالای خود را ثبت کنید و فروش خود را مدیریت کنید
                </p>
                <AddProductModal disabled={!hasAccess} />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/20">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">کالایی یافت نشد</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
                هیچ کالایی با عبارت "{searchQuery}" پیدا نشد
            </p>
            <div className="flex gap-3">
                <Button variant="outline" onClick={onReset}>
                    حذف جستجو
                </Button>
                <AddProductModal disabled={!hasAccess} />
            </div>
        </div>
    );
}
