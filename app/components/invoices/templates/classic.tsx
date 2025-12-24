import useBranding from "@/store/branding";
import type { User } from "@/types/user";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { Instagram, MapPinHouse, PhoneCall } from "lucide-react";
import type { InvoiceViewModel } from "@/types/invoice";
type invoiceProps = {
    invoice: InvoiceViewModel;
    user: User | null;
};
export default function Classic({ invoice, user }: invoiceProps) {
    const brandingLogo = useBranding((state) => state.logo);
    const { colors } = useBranding();
    return (
        <div className="w-[794px] min-h-[1123px] mx-auto bg-white p-10 flex flex-col">
            <header className="pb-8">
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
                    {user && brandingLogo && (
                        <p className="ml-4 text-xl font-light">
                            {user.store_name}
                        </p>
                    )}
                </div>
                <p className="text-center text-2xl my-5 font-semibold">
                    فاکتور
                </p>
            </header>
            <section className="flex justify-between">
                <div>
                    <p>
                        <span className="font-semibold">شماره فاکتور:</span>
                        <span>{invoice.invoiceNumber}</span>
                    </p>
                    <p>
                        <span className="font-semibold">تاریخ ایجاد: </span>
                        <span>{invoice.createdAt}</span>
                    </p>
                </div>

                <div className="text-left">
                    <h2 className="font-semibold text-lg">اطلاعات مشتری</h2>
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
            </section>
            <section>
                <div className="mt-10">
                    <Table className="w-full border-collapse border border-gray-300">
                        <TableHeader>
                            <TableRow
                                style={{
                                    backgroundColor: colors?.base,
                                    color: colors?.text,
                                    borderColor: colors?.border,
                                }}
                                className="print:bg-gray-200 print:text-black"
                            >
                                <th className="border border-gray-300 p-2 text-right">
                                    نام محصول
                                </th>
                                <th className="border border-gray-300 p-2 text-right">
                                    تعداد
                                </th>
                                <th className="border border-gray-300 p-2 text-right">
                                    قیمت واحد
                                </th>
                                <th className="border border-gray-300 p-2 text-right">
                                    قیمت کل
                                </th>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoice.items.map((item, index) => (
                                <TableRow key={index}>
                                    <td className="border border-gray-300 p-2 text-right">
                                        {item.name}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-right">
                                        {item.quantity}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-right">
                                        {item.unitPrice}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-right">
                                        {item.total}
                                    </td>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-10 space-y-2">
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
                    <p>
                        <span className="font-semibold">وضعیت: </span>
                        <span>{invoice.statusText}</span>
                    </p>

                    <p>
                        <span className="font-semibold">روش پرداخت: </span>
                        <span>{invoice.paymentText}</span>
                    </p>
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
