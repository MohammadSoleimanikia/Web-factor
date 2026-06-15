// features/invoices/components/InvoiceTableEmptyState.tsx
import { FileText } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/features/shared/components/ui/button";
import { Card } from "@/features/shared/components/ui/card";

interface InvoiceTableEmptyStateProps {
    hasFilters: boolean;
    searchQuery: string;
    status: string;
    onReset: () => void;
}

export function InvoiceTableEmptyState({
    hasFilters,
    searchQuery,
    status,
    onReset,
}: InvoiceTableEmptyStateProps) {
    if (!hasFilters) {
        return (
            <Card className="flex  flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <FileText className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                    هنوز فاکتوری ثبت نکرده‌اید
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                    اولین فاکتور خود را ثبت کنید و فروش خود را مدیریت کنید
                </p>
                <Link to="/invoices/new">
                    <Button>
                        <FileText className="w-4 h-4 ml-2" />
                        ایجاد اولین فاکتور
                    </Button>
                </Link>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">فاکتوری یافت نشد</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
                هیچ فاکتوری با معیارهای جستجوی شما پیدا نشد
                {searchQuery && ` (جستجو: "${searchQuery}")`}
                {status !== "all" &&
                    ` (وضعیت: ${status === "paid" ? "پرداخت شده" : "در انتظار"})`}
            </p>
            <Button variant="outline" onClick={onReset}>
                حذف فیلترها
            </Button>
        </Card>
    );
}
