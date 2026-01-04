import { useState } from "react";

import Header from "@/components/invoices/header";
import InvoiceTable from "@/components/invoices/invoiceTable";

export default function invoices() {
    
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <Header setSearchQuery={setSearchQuery} />
            <InvoiceTable searchQuery={searchQuery} />
        </>
    );
}
