import { useState } from "react";

import CustomersTable from "@/components/customers/customersTable";
import Header from "@/components/customers/header";

export default function Customers() {
    const [reload, setReload] = useState(0);
    return <>
    <Header onAdded={() => setReload((prev) => prev + 1)} />
    <CustomersTable reload={reload} />
    </>;
}
