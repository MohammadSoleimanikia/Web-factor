import { Check, Eye, MoreHorizontalIcon, SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";

import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import DeleteConfirm from "../ui/deleteConfirm";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SharePublicLinkDialog from "./sharePublicLinkDialog";

type InvoiceActionsProps = {
    invoiceId: string;
    invoiceToken: string;
    invoiceStatus: string | undefined;
    handleDelete: (id: string, status: string) => void;
    handleEdit: (id: string, status: string) => void;
    handlePaid: (id: string, status: string) => void;
};
export default function InvoiceActions({
    invoiceId,
    invoiceToken,
    invoiceStatus,
    handleDelete,
    handleEdit,
    handlePaid,
}: InvoiceActionsProps) {
    return (
        <ButtonGroup>
            <Link to={`/invoices/${invoiceId}`}>
                <Button variant="outline">
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
                    >
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        {invoiceStatus && (
                            <DropdownMenuItem
                                onClick={() =>
                                    handleEdit(invoiceId, invoiceStatus)
                                }
                            >
                                <SquarePen />
                                ویرایش فاکتور
                            </DropdownMenuItem>
                        )}
                        {invoiceStatus && (
                            <DropdownMenuItem
                                onClick={() =>
                                    handlePaid(invoiceId, invoiceStatus)
                                }
                            >
                                <Check />
                                تغیر حالت به پرداخت شده
                            </DropdownMenuItem>
                        )}
                        {invoiceStatus && (
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                }}
                                variant="destructive"
                            >
                                <DeleteConfirm
                                    title="فاکتور"
                                    onConfirm={() =>
                                        handleDelete(invoiceId, invoiceStatus)
                                    }
                                    trigger={
                                        <div className="flex items-center justify-between w-full">
                                            <Trash className="w-4 h-4" />
                                            حذف فاکتور
                                        </div>
                                    }
                                />
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </ButtonGroup>
    );
}
