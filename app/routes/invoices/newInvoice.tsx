import NewInvoiceForm from "@/components/invoices/newInvoiceForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NewInvoice() {
    return (
        <>
            <h1 className="title">فاکتور جدید</h1>
            <div className="flex flex-row-reverse my-5">
                <Button asChild >
                    <Link to="/invoices">بازگشت به فاکتورها</Link>
                </Button>
            </div>
            <NewInvoiceForm/>
        </>
    );
}
