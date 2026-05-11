import { useState } from "react";

import Header from "@/features/invoices/components/header";
import InvoiceTable from "@/features/invoices/components/invoiceTable";

export default function invoices() {
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState("all");
    return (
        <>
            <Header setSearchQuery={setSearchQuery} setStatus={setStatus} />
            <InvoiceTable searchQuery={searchQuery} status={status} />
        </>
    );
}
