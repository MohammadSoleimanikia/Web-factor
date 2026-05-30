import { useState } from "react";

import type { Customer } from "@/features/customers/types/customer";
import DeleteConfirm from "@/features/shared/components/ui/deleteConfirm";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/features/shared/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

import { useCustomers } from "../hooks/useCustomers";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import CustomersSkeleton from "./customersSkeleton";
export default function CustomersTable() {
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const { data, isLoading } = useCustomers({
        page,
        pageSize,
    });
    const { mutateAsync: deleteCustomer } =
        useDeleteCustomer();
    const customers = data?.results || [];
    const count = data?.count || 0;
    const totalPages = Math.ceil(count / pageSize);

    const handleDelete = async (id: number) => {
        await deleteCustomer(id);
    };
    return (
        <>
            {isLoading ? (
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
