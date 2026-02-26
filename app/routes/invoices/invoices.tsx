import { useState } from "react";

import Header from "@/components/invoices/header";
import InvoiceTable from "@/components/invoices/invoiceTable";

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
