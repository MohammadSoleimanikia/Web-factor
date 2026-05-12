import { useState } from "react";

import Header from "@/features/products/components/header";
import ProductTable from "@/features/products/components/productTable";

export default function Products() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="space-y-4 p-4">
            <Header setSearchQuery={setSearchQuery} />
            <ProductTable searchQuery={searchQuery} />
        </div>
    );
}
