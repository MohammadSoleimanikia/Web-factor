// features/customers/components/CustomersTableEmptyState.tsx
import { Users } from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";

import AddCustomerModal from "./addCustomerModal";

interface CustomersTableEmptyStateProps {
    hasSearch: boolean;
    searchQuery?: string;
    onReset: () => void;
    hasAccess: boolean;
}

export function CustomersTableEmptyState({
    hasSearch,
    searchQuery,
    onReset,
    hasAccess,
}: CustomersTableEmptyStateProps) {
    if (!hasSearch) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg bg-muted/20">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                    هنوز مشتری‌ای ثبت نکرده‌اید
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                    اولین مشتری خود را ثبت کنید و اطلاعات آن را مدیریت کنید
                </p>
                <AddCustomerModal disabled={!hasAccess} />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/20">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">مشتری‌ای یافت نشد</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
                {searchQuery &&
                    `هیچ مشتری‌ای با عبارت "${searchQuery}" پیدا نشد`}
            </p>
            <div className="flex gap-3">
                <Button variant="outline" onClick={onReset}>
                    حذف جستجو
                </Button>
                <AddCustomerModal  />
            </div>
        </div>
    );
}
