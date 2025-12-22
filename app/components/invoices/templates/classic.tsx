import type { Invoice } from "@/types/invoice";
import useBranding from "@/store/branding";
import type { User } from "@/types/user";
import { toJalali } from "@/lib/jalali";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { invoiceStatusFa, paymentModeFa } from "@/constants/invoice";
import type { Product } from "@/types/product";
import num2persian from "num2persian";
import { Instagram, MapPinHouse, PhoneCall } from "lucide-react";
type invoiceProps={
    invoice:Invoice;
    user:User | null,
    products:Product[],
}
export default function Classic({
    invoice,
    user,
    products,
}: invoiceProps) {
    const brandingColor = useBranding((state) => state.color);
    const brandingLogo = useBranding((state) => state.logo);
    console.log("Invoice:", invoice);
    console.log("User:", user);
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
                    {user && (
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
                        <span>{invoice.invoice_number}</span>
                    </p>
                    <p>
                        <span className="font-semibold">تاریخ ایجاد: </span>
                        <span>{toJalali(invoice.created)}</span>
                    </p>
                </div>

                <div className="text-left">
                    <h2
                        className="font-semibold text-lg"
                        style={{ color: brandingColor || "#000" }}
                    >
                        اطلاعات مشتری
                    </h2>
                    <p>
                        <span className="font-semibold">نام : </span>
                        <span>{invoice.customer_name}</span>
                    </p>
                    <p>
                        <span className="font-semibold">آدرس: </span>
                        <span>{invoice.customer_address}</span>
                    </p>
                    <p>
                        <span className="font-semibold">ایمیل: </span>
                        <span>{invoice.customer_email}</span>
                    </p>
                    <p>
                        <span className="font-semibold">تلفن: </span>
                        <span>{invoice.customer_phone_number}</span>
                    </p>
                </div>
            </section>
            <section>
                <div className="mt-10">
                    <Table className="w-full border-collapse border border-gray-300">
                        <TableHeader>
                            <TableRow
                                style={{
                                    backgroundColor: brandingColor || "#000",
                                }}
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
                                        {products.find(
                                            (p) => p.id === item.product
                                        )?.name || "نام محصول نامشخص"}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-right">
                                        {item.quantity}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-right">
                                        {item.price}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-right">
                                        {Number(item.price) * item.quantity}
                                    </td>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-10 space-y-2">
                    <p>
                        <span className="font-semibold pl-2">مجموع:</span>
                        <span>{invoice.total_amount}</span>
                    </p>
                    <p>
                        <span className="font-semibold pl-2">
                            {" "}
                            مجموع به حروف:
                        </span>
                        <span>{num2persian(invoice.total_amount)} تومان</span>
                    </p>
                    <p>
                        <span className="font-semibold">وضعیت: </span>
                        <span>
                            {invoice.status
                                ? invoiceStatusFa[invoice.status]
                                : "نامشخص"}
                        </span>
                    </p>

                    <p>
                        <span className="font-semibold">روش پرداخت: </span>
                        <span>
                            {invoice.payment_mode
                                ? paymentModeFa[invoice.payment_mode]
                                : "نامشخص"}
                        </span>
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

