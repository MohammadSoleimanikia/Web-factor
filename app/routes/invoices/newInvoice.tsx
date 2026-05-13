import { Link } from "react-router";
import { useParams } from "react-router";

import { Button } from "@/features/shared/components/ui/button";
import NewInvoiceForm from "@/features/invoices/components/newInvoiceForm";
export default function NewInvoice() {
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <>
            <div className="flex justify-between items-center  my-5">
                <h1 className="title">
                    {isEdit ? "ویرایش فاکتور" : "فاکتور جدید"}
                </h1>
                <Button asChild>
                    <Link to="/invoices">بازگشت به فاکتورها</Link>
                </Button>
            </div>
            <NewInvoiceForm invoiceID={id} />
        </>
    );
}
