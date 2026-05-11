import Classic from "@/components/invoices/templates/classic";
import Minimal from "@/components/invoices/templates/minimal";
import Modern from "@/components/invoices/templates/modern";
import Zoomable from "@/components/zoomable";
import type { User } from "@/features/auth/types/user.type";
import { buildInvoiceViewModel } from "@/lib/invoiceViewModel";

import type { Invoice } from "../types/invoicePreview.type";

type InvoicePreviewProps = {
    template: "classic" | "modern" | "minimal";
    invoice: Invoice;
    user: User | null;
};
export default function InvoicePreview({
    template,
    invoice,
    user,
}: InvoicePreviewProps) {
    const viewModel = buildInvoiceViewModel({ invoice });
    return (
        <div
            className="
                            relative
                            w-full min-h-screen
                            overflow-hidden
                            bg-muted p-5
                            flex justify-center items-start
                            dark:bg-muted-foreground
                            print:text-black print:bg-white print:p-0 print:m-0 print:overflow-visible
                        "
        >
            <Zoomable>
                <div className="w-screen h-screen">
                    {template === "classic" ? (
                        <Classic invoice={viewModel} user={user} />
                    ) : template === "modern" ? (
                        <Modern invoice={viewModel} user={user} />
                    ) : (
                        <Minimal invoice={viewModel} user={user} />
                    )}
                </div>
            </Zoomable>
        </div>
    );
}
