import { Instagram, MapPinHouse, PhoneCall } from "lucide-react";

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import useAuth from "@/store/auth";
import type { InvoiceViewModel } from "@/types/invoice";
import type { User } from "@/types/user";
type invoiceProps = {
    invoice: InvoiceViewModel;
    user: User | null;
};
export default function Minimal({ invoice, user }: invoiceProps) {
    const { profile } = useAuth();
    const brandingLogo = profile?.profile.logo;
    return (
        <div className="w-[210mm] min-h-[297mm] mx-auto bg-white dark:bg-muted  print:dark:bg-white p-10 flex flex-col print:page-break-inside-avoid">
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
                <div className="flex flex-col items-center">
                    {brandingLogo ? (
                        <img
                            src={`https://invociemanager-production.up.railway.app/account${profile.profile.logo}`}
                            alt="Logo"
                            className="w-36 "
                        />
                    ) : (
                        <h2 className="text-3xl font-bold">
                            {user?.profile.store_name}
                        </h2>
                    )}
                    {user && brandingLogo && (
                        <p className="ml-4 text-xl font-light">
                            {user.profile.store_name}
                        </p>
                    )}
                </div>
            </header>
            <hr className="border-t border-gray-300" />
            <section>
                <div className="mt-10">
                    <Table className="w-full border-collapse">
                        <TableHeader>
                            <TableRow className="border-b border-gray-300">
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
            <footer className="mt-auto flex gap-5 justify-around">
                {
                        user?.profile.insta_link && (
                            <div className="flex gap-2">
                                <Instagram />
                                {user?.profile.insta_link}
                            </div>
                        )
                    }
                    {
                        user?.phone_number && (
                            <div className="flex gap-2">
                                <PhoneCall />
                                {user?.phone_number}
                            </div>
                        )
                    }
                    {
                        user?.profile.store_address && (
                            <div className="flex gap-2">
                                <MapPinHouse />
                                {user?.profile.store_address}
                            </div>
                        )
                    }
            </footer>
        </div>
    );
}
