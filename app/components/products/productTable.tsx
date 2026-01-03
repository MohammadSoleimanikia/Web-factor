import { useEffect, useState } from "react";
import ProductsSkeleton from "@/components/products/productsSkeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { PaginatedProductList, Product } from "@/types/product";
import { apiFetch } from "@/lib/api";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import DeleteConfirm from "../ui/deleteConfirm";
import { toast } from "sonner";
export default function ProductTable({ reload }: { reload: number }) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [count, setCount] = useState(0);
    const totalPages = Math.ceil(count / pageSize);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            try {
                const data = await apiFetch<PaginatedProductList>(
                    `/user/products/?page=${page}&page_size=${pageSize}`
                );
                setProducts(data.results);
                setCount(data.count);
            } catch (err) {
                console.log(err);
            }

            setLoading(false);
        };

        fetchProducts();
    }, [reload, page]);
    const handleDelete = async (id: number) => {
        try {
            await apiFetch(`/user/products/${id}/`, { method: "DELETE" });
            setProducts(products.filter((p: Product) => p.id !== id));
            toast.success("محصول حذف شد");
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    };

    return (
        <>
            {loading ? (
                <ProductsSkeleton />
            ) : (
                <>
                    <Table className="my-5">
                        <TableHeader className="bg-muted rounded-sm">
                            <TableRow>
                                <TableHead>نام</TableHead>
                                <TableHead>توضیحات</TableHead>
                                <TableHead>قیمت</TableHead>
                                <TableHead>عملیات</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {products?.map((p: Product) => (
                                <TableRow key={p.id}>
                                    <TableCell className="text-right">
                                        {p.name}
                                    </TableCell>
                                    <TableCell>
                                        {p.description || "-"}
                                    </TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <span>{p.price}</span>
                                        <span>تومان</span>
                                    </TableCell>
                                    <TableCell>
                                        <DeleteConfirm
                                            title={"کالا"}
                                            onConfirm={() => handleDelete(p.id)}
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
