import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { apiFetch } from "@/lib/api";
import type { Customer, PaginatedCustomerList } from "@/types/customer";

import DeleteConfirm from "../ui/deleteConfirm";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import CustomersSkeleton from "./customersSkeleton";
export default function CustomersTable({ reload }: { reload: number }) {
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [count, setCount] = useState(0);
    const totalPages = Math.ceil(count / pageSize);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);

            try {
                const data = await apiFetch<PaginatedCustomerList>(
                    `/account/customers/?page=${page}&page_size=${pageSize}`,
                );
                setCustomers(data.results);
                setCount(data.count);
            } catch (err) {
                console.log(err);
            }

            setLoading(false);
        };

        fetchCustomers();
    }, [reload, page]);
    const handleDelete = async (id: number) => {
        try {
            await apiFetch(`/account/customers/${id}/`, { method: "DELETE" });
            setCustomers(customers.filter((c: Customer) => c.id !== id));
            toast.success("مشتری حذف شد");
        } catch (err: unknown) {
            if (err instanceof Error) toast.error(err.message);
        }
    };
    return (
        <>
            {loading ? (
                <CustomersSkeleton />
            ) : (
                <>
                    <Table className="my-5">
                        <TableHeader className="bg-muted rounded-sm">
                            <TableRow>
                                <TableHead>نام</TableHead>
                                <TableHead>آدرس</TableHead>
                                <TableHead>شماره تلفن</TableHead>
                                <TableHead>عملیات</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {customers?.map((c: Customer) => (
                                <TableRow key={c.id}>
                                    <TableCell className="text-right">
                                        {c.name}
                                    </TableCell>
                                    <TableCell>{c.address || "-"}</TableCell>
                                    <TableCell className="text-right">
                                        {c.phone_number}
                                    </TableCell>
                                    <TableCell>
                                        <DeleteConfirm
                                            onConfirm={() => handleDelete(c.id)}
                                            title="مشتری"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {totalPages > 1 && (
                        <Pagination className="mt-4" dir="rtl">
                            <PaginationContent>
                                {/* Next (on right in RTL) */}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            page < totalPages &&
                                            setPage(page + 1)
                                        }
                                        className={
                                            page === totalPages
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                        }
                                    />
                                </PaginationItem>

                                {/* Page numbers reversed for RTL */}
                                {Array.from({ length: totalPages })
                                    .reverse()
                                    .map((_, i) => {
                                        const pageNumber = totalPages - i;

                                        return (
                                            <PaginationItem key={pageNumber}>
                                                <PaginationLink
                                                    isActive={
                                                        page === pageNumber
                                                    }
                                                    onClick={() =>
                                                        setPage(pageNumber)
                                                    }
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                {/* Previous (on left in RTL) */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() =>
                                            page > 1 && setPage(page - 1)
                                        }
                                        className={
                                            page === 1
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </>
            )}
        </>
    );
}
