import useBranding from "@/store/branding";
import type { User } from "@/types/user";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { Instagram, MapPinHouse, PhoneCall } from "lucide-react";
import type { InvoiceViewModel } from "@/types/invoice";
type invoiceProps = {
    invoice: InvoiceViewModel;
    user: User | null;
};
export default function Minimal({ invoice, user }: invoiceProps) {
    const brandingLogo = useBranding((state) => state.logo);
    return (
        <div className="w-[794px] min-h-[1123px] mx-auto bg-white p-10 flex flex-col">
            <header className="flex justify-between pb-8">
                <div className="mt-3 space-y-5">
                    <div>
                        <p className="text-2xl font-bold">
                            <span className="font-semibold">شماره فاکتور:</span>
                            <span>{invoice.invoiceNumber}</span>
                        </p>
                        <p>
                            <span className="font-semibold">تاریخ ایجاد: </span>
                            <span>{invoice.createdAt}</span>
                        </p>
                    </div>
                    <div>
                        <div className="mt-5">
                            <h2 className="font-semibold text-lg">
                                اطلاعات مشتری
                            </h2>
                            <p>
                                <span className="font-semibold">نام : </span>
                                <span>{invoice.customer.name}</span>
                            </p>
                            <p>
                                <span className="font-semibold">آدرس: </span>
                                <span>{invoice.customer.address}</span>
                            </p>
                            <p>
                                <span className="font-semibold">ایمیل: </span>
                                <span>{invoice.customer.email}</span>
                            </p>
                            <p>
                                <span className="font-semibold">تلفن: </span>
                                <span>{invoice.customer.phone}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* branding */}
                <div>
                    {brandingLogo ? (
                        <img
                            src={brandingLogo}
                            alt="Logo"
                            className="h-24 w-auto"
                        />
                    ) : (
                        <h2 className="text-3xl font-bold">
                            {user?.store_name}
                        </h2>
                    )}
                </div>
            </header>
            <hr className="border-t border-gray-300" />
            <section>
                <div className="mt-10">
                    <Table  className="w-full border-collapse">
                        <TableHeader>
                            <TableRow
                                className="border-b border-gray-300"
                                
                            >
                                <th className=" p-2 text-right">نام محصول</th>
                                <th className="p-2 text-right">تعداد</th>
                                <th className="p-2 text-right">قیمت واحد</th>
                                <th className="p-2 text-right">قیمت کل</th>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="border-0 border-b">
                            {invoice.items.map((item, index) => (
                                <TableRow className="border-0" key={index}>
                                    <td className="p-2 text-right">
                                        {item.name}
                                    </td>
                                    <td className="p-2 text-right">
                                        {item.quantity}
                                    </td>
                                    <td className="p-2 text-right">
                                        {item.unitPrice}
                                    </td>
                                    <td className="p-2 text-right">
                                        {item.total}
                                    </td>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-10 space-y-2">
                    <p>
                        <span className="font-semibold">وضعیت: </span>
                        <span>{invoice.statusText}</span>
                    </p>

                    <p>
                        <span className="font-semibold">روش پرداخت: </span>
                        <span>{invoice.paymentText}</span>
                    </p>

                    <div className="border-y-4 border-gray-600 w-fit py-2">
                        <p>
                            <span className="font-semibold pl-2">مجموع:</span>
                            <span>{invoice.total}</span>
                        </p>
                        <p>
                            <span className="font-semibold pl-2">
                                {" "}
                                مجموع به حروف:
                            </span>
                            <span>{invoice.totalText}</span>
                        </p>
                    </div>
                </div>
            </section>
            <footer className="mt-auto flex gap-5 justify-between">
                <div className="flex gap-2">
                    <Instagram />
                    {user?.insta_link}
                </div>
                <div className="flex gap-2">
                    <PhoneCall />
                    {user?.phone_number}
                </div>
                <div className="flex gap-2">
                    <MapPinHouse />
                    {user?.store_address}
                </div>
            </footer>
        </div>
    );
}
