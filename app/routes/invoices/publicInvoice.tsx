import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Classic from "@/components/invoices/templates/classic";
import Minimal from "@/components/invoices/templates/minimal";
import Modern from "@/components/invoices/templates/modern";
import { useTheme } from "@/components/themeProvider";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { apiFetch } from "@/lib/api";
import { buildInvoiceViewModel } from "@/lib/invoiceViewModel";
import type { User } from "@/types/user";

export type InvoiceViewModel = ReturnType<typeof buildInvoiceViewModel>;
export default function PublicInvoice() {
    const { invoiceToken } = useParams<{ invoiceToken: string }>();
    const { theme, setTheme } = useTheme();
    const [invoice, setInvoice] = useState<InvoiceViewModel | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [template, setTemplate] = useState("minimal");

    useEffect(() => {
        const fetchInvoice = async () => {
            if (!invoiceToken) {
                setError("توکن فاکتور نامعتبر است");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await apiFetch<any>(
                    `/api/public/invoices/${invoiceToken}/`,
                );
                // API response has invoice_details nested
                const invoiceData = response.invoice_details || response;
                setInvoice(buildInvoiceViewModel({ invoice: invoiceData }));
                // Extract user data if available
                if (invoiceData.creator_details) {
                    setUser(invoiceData.creator_details);
                }
            } catch (err) {
                console.log(err);
                setError("خطا در بارگذاری فاکتور");
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [invoiceToken]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>در حال بارگذاری...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>فاکتور یافت نشد</div>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 flex gap-4 print:hidden">
                <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger className="w-fit bg-white">
                        <SelectValue placeholder="قالب" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="classic">کلاسیک</SelectItem>
                        <SelectItem value="minimal">مینیمال</SelectItem>
                        <SelectItem value="modern">مدرن</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={() => window.print()}>چاپ</Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    title={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </Button>
            </div>
            <div className="overflow-x-scroll bg-muted p-5 space-y-3 dark:bg-muted-foreground print:text-black print:bg-white print:p-0 print:m-0 print:overflow-visible">
                {template === "classic" ? (
                    <Classic invoice={invoice} user={user} />
                ) : template === "modern" ? (
                    <Modern invoice={invoice} user={user} />
                ) : (
                    <Minimal invoice={invoice} user={user} />
                )}
            </div>
        </>
    );
}
