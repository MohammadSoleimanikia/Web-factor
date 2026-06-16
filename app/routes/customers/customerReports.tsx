import {
    ArrowRight,
    Eye,
    MoreHorizontalIcon,
    SquarePen,
    Trash,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { useCustomer } from "@/features/customers/hooks/useCustomer";
import { useCustomerInvoices } from "@/features/customers/hooks/useCustomerInvoices";
import { useDeleteInvoice } from "@/features/invoices/hooks/useDeleteInvoice";
import { useMarkInvoiceAsPaid } from "@/features/invoices/hooks/useMarkInvoiceAsPaid";
import type { Invoice } from "@/features/invoices/types/invoicePreview.type";
import { Button } from "@/features/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";
import DeleteConfirm from "@/features/shared/components/ui/deleteConfirm";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/features/shared/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

export default function CustomerReports() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: customer, isLoading: customerLoading } = useCustomer(id!);
    const {
        data: invoices,
        isLoading: invoicesLoading,
        refetch,
    } = useCustomerInvoices({
        customerId: customer?.phone_number || "",
        page: 1,
        pageSize: 50,
    });

    const { mutateAsync: deleteInvoice } = useDeleteInvoice();
    const { mutateAsync: markAsPaid } = useMarkInvoiceAsPaid();

    const invoiceList = invoices?.results || [];
    const pendingInvoices = invoiceList.filter(
        (inv) => inv.status === "pending",
    );
    const totalInvoices = invoiceList.length;
    const totalAmount = invoiceList.reduce(
        (sum, inv) => sum + (inv.total_amount || 0),
        0,
    );
    const pendingAmount = pendingInvoices.reduce(
        (sum, inv) => sum + (inv.total_amount || 0),
        0,
    );

    const isLoading = customerLoading || invoicesLoading;

    const handleViewInvoice = (invoiceId: string) => {
        navigate(`/invoices/${invoiceId}`);
    };

    const handleEdit = (
        invoiceId: string,
        invoiceStatus: string | undefined,
    ) => {
        if (invoiceStatus === "paid") {
            toast.error("فاکتور پرداخت شده را نمی‌توان ویرایش کرد");
            return;
        }
        navigate(`/invoices/edit/${invoiceId}`);
    };

    const handleDelete = async (
        invoiceId: string,
        invoiceStatus: string | undefined,
    ) => {
        if (invoiceStatus === "paid") {
            toast.error("فاکتور پرداخت شده را نمی‌توان حذف کرد");
            return;
        }
        try {
            await deleteInvoice({ id: invoiceId });
            toast.success("فاکتور با موفقیت حذف شد");
            refetch();
        } catch {
            toast.error("خطا در حذف فاکتور");
        }
    };

    const handleMarkAsPaid = async (
        invoiceId: string,
        invoiceStatus: string | undefined,
    ) => {
        if (invoiceStatus === "paid") {
            toast.error("فاکتور از قبل پرداخت شده است");
            return;
        }
        try {
            await markAsPaid({ id: invoiceId });
            toast.success("فاکتور با موفقیت به پرداخت شده تغییر یافت");
            refetch();
        } catch {
            toast.error("خطا در تغییر وضعیت فاکتور");
        }
    };

    const InvoiceActionButtons = ({ invoice }: { invoice: Invoice }) => (
        <div className="flex gap-1">
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewInvoice(invoice.id)}
                className="rounded-r-full"
            >
                <Eye className="w-4 h-4" />
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-l-full"
                    >
                        <MoreHorizontalIcon className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onClick={() =>
                                handleEdit(invoice.id, invoice.status)
                            }
                        >
                            <SquarePen className="w-4 h-4" />
                            ویرایش فاکتور
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() =>
                                handleMarkAsPaid(invoice.id, invoice.status)
                            }
                        >
                            <span className="w-4 h-4">✓</span>
                            تغییر حالت به پرداخت شده
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="p-0"
                        >
                            <DeleteConfirm
                                title="فاکتور"
                                onConfirm={() =>
                                    handleDelete(invoice.id, invoice.status)
                                }
                                trigger={
                                    <div className="flex items-center gap-2 w-full px-2 py-1.5 text-red-600">
                                        <Trash className="w-4 h-4" />
                                        حذف فاکتور
                                    </div>
                                }
                            />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.history.back()}
                >
                    <ArrowRight className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">گزارشات مشتری</h1>
                </div>
            </div>

            {/* اطلاعات تماس مشتری */}
            <Card>
                <CardHeader>
                    <CardTitle>اطلاعات تماس</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">نام</p>
                            <p className="font-medium">
                                {isLoading ? "-" : customer?.name || "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                شماره تلفن
                            </p>
                            <p className="font-medium">
                                {isLoading
                                    ? "-"
                                    : customer?.phone_number || "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                آدرس
                            </p>
                            <p className="font-medium">
                                {isLoading ? "-" : customer?.address || "-"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            کل فاکتورها
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isLoading ? "-" : totalInvoices}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            در انتظار پرداخت
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {isLoading ? "-" : pendingInvoices.length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            کل مبلغ
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isLoading
                                ? "-"
                                : totalAmount.toLocaleString("fa-IR")}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            مبلغ معوق
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {isLoading
                                ? "-"
                                : pendingAmount.toLocaleString("fa-IR")}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* فاکتورهای معوق */}
            {pendingInvoices.length > 0 && (
                <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                        <CardTitle>فاکتورهای در انتظار پرداخت</CardTitle>
                        <CardDescription>
                            {pendingInvoices.length} فاکتور در انتظار پرداخت
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>شماره فاکتور</TableHead>
                                    <TableHead>تاریخ</TableHead>
                                    <TableHead>مبلغ</TableHead>
                                    <TableHead>وضعیت</TableHead>
                                    <TableHead>عملیات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingInvoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">
                                            {invoice.invoice_number}
                                        </TableCell>
                                        <TableCell>{`${invoice.created.split(" ")[1]} ${invoice.created.split(" ")[0]} `}</TableCell>
                                        <TableCell>
                                            {invoice.total_amount?.toLocaleString(
                                                "fa-IR",
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                در انتظار
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <InvoiceActionButtons
                                                invoice={invoice}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* تمام فاکتورها */}
            <Card>
                <CardHeader>
                    <CardTitle>تمام فاکتورها</CardTitle>
                    <CardDescription>
                        لیست تمام فاکتورهای این مشتری
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>شماره فاکتور</TableHead>
                                <TableHead>تاریخ</TableHead>
                                <TableHead>مبلغ</TableHead>
                                <TableHead>وضعیت</TableHead>
                                <TableHead>عملیات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-8"
                                    >
                                        در حال بارگذاری...
                                    </TableCell>
                                </TableRow>
                            ) : invoiceList.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-muted-foreground py-8"
                                    >
                                        فاکتوری برای این مشتری موجود نیست
                                    </TableCell>
                                </TableRow>
                            ) : (
                                invoiceList.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">
                                            {invoice.invoice_number}
                                        </TableCell>
                                        <TableCell>
                                            {`${invoice.created.split(" ")[1]} ${invoice.created.split(" ")[0]} `}
                                        </TableCell>
                                        <TableCell>
                                            {invoice.total_amount?.toLocaleString(
                                                "fa-IR",
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${
                                                    invoice.status === "paid"
                                                        ? "bg-green-100 text-green-800"
                                                        : invoice.status ===
                                                            "pending"
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {invoice.status === "paid"
                                                    ? "پرداخت شده"
                                                    : invoice.status ===
                                                        "pending"
                                                      ? "در انتظار"
                                                      : "لغو شده"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <InvoiceActionButtons
                                                invoice={invoice}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
