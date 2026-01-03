import { Link } from "react-router";

import NewInvoiceForm from "@/components/invoices/newInvoiceForm";
import { Button } from "@/components/ui/button";

export default function NewInvoice() {
    return (
        <>
            <div className="flex justify-between items-center  my-5">
            <h1 className="title">فاکتور جدید</h1>
                <Button asChild >
                    <Link to="/invoices">بازگشت به فاکتورها</Link>
                </Button>
            </div>
            <NewInvoiceForm/>
        </>
    );
}
