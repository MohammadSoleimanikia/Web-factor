import { useState } from "react";

import Header from "@/components/products/header";
import ProductTable from "@/components/products/productTable";

export default function Products() {
    const [reload, setReload] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="space-y-4 p-4">
            <Header setSearchQuery={setSearchQuery} onAdded={() => setReload((prev) => prev + 1)} />
            <ProductTable reload={reload} searchQuery={searchQuery} onAdded={() => setReload((prev) => prev + 1)}/>
        </div>
    );
}
