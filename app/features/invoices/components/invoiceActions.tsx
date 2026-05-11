import { Check, Eye, MoreHorizontalIcon, SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";

import SharePublicLinkDialog from "./sharePublicLinkDialog";
import { Button } from "../../../components/ui/button";
import DeleteConfirm from "../../../components/ui/deleteConfirm";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

type InvoiceActionsProps = {
    invoiceId: string;
    invoiceToken: string;
    invoiceStatus: string | undefined;
    handleDelete: (id: string, status: string | undefined) => void;
    handleEdit: (id: string, status: string | undefined) => void;
    handlePaid: (id: string, status: string | undefined) => void;
    isDeleting: boolean;
    isPaying: boolean;
};

export default function InvoiceActions({
    invoiceId,
    invoiceToken,
    invoiceStatus,
    handleDelete,
    handleEdit,
    handlePaid,
    isDeleting,
    isPaying,
}: InvoiceActionsProps) {
    return (
        <>
            <Link to={`/invoices/${invoiceId}`}>
                <Button variant="outline" className="rounded-r-full">
                    <Eye className="w-4 h-4" />
                </Button>
            </Link>

            <SharePublicLinkDialog invoiceToken={invoiceToken} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="More Options"
                        className="rounded-l-full rounded-r-null"
                    >
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        {/* ویرایش */}
                        <DropdownMenuItem
                            onClick={() => handleEdit(invoiceId, invoiceStatus)}
                            className="flex justify-between"
                            disabled={isDeleting || isPaying}
                        >
                            <SquarePen />
                            ویرایش فاکتور
                        </DropdownMenuItem>

                        {/* تغییر وضعیت به پرداخت شده */}
                        <DropdownMenuItem
                            disabled={isPaying || isDeleting}
                            onClick={() => handlePaid(invoiceId, invoiceStatus)}
                            className="flex justify-between"
                        >
                            <Check />
                            تغییر حالت به پرداخت شده
                        </DropdownMenuItem>

                        {/* حذف فاکتور */}
                        <DropdownMenuItem
                            disabled={isDeleting || isPaying}
                            className="p-0"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <DeleteConfirm
                                title="فاکتور"
                                disabled={isDeleting}
                                onConfirm={() =>
                                    handleDelete(invoiceId, invoiceStatus)
                                }
                                trigger={
                                    <div className="flex items-center justify-between w-full px-2 py-1.5 text-red-600">
                                        <Trash className="w-4 h-4" />
                                        حذف فاکتور
                                    </div>
                                }
                            />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
