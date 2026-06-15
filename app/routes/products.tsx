// routes/products.tsx
import { useState } from "react";

import Header from "@/features/products/components/header";
import ProductTable from "@/features/products/components/productTable";

export default function Products() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleResetSearch = () => {
        setSearchQuery("");
    };

    return (
        <div >
            <Header setSearchQuery={setSearchQuery} />
            <ProductTable
                searchQuery={searchQuery}
                onResetSearch={handleResetSearch}
            />
        </div>
    );
}
