import { useEffect, useState } from "react";
import ProductsSkeleton from "@/components/products/productsSkeleton";
import ProductHeader from "@/components/products/productsHeader";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/store/auth";
import type { Product } from "@/types/product";
import { apiFetch } from "@/lib/api";
import { Button } from "../ui/button";
export default function ProductTable({ reload }: { reload: number }) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const { token } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            try {
                const accessToken = token?.access;

                const data = await apiFetch(
                    `/user/products/?page=${page}&page_size=${pageSize}`
                );
                setProducts(data);
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
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {loading ? (
                <ProductsSkeleton />
            ) : (
                <Table className="my-5">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">عملیات</TableHead>
                            <TableHead className="text-right">قیمت</TableHead>
                            <TableHead className="text-right">
                                توضیحات
                            </TableHead>
                            <TableHead className="text-right">نام</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {products?.map((p: Product) => (
                            <TableRow key={p.id}>
                                <TableCell><Button onClick={() => handleDelete(p.id)} variant="destructive">حذف</Button></TableCell>
                                <TableCell className="font-medium flex gap-2 justify-end">
                                    <span>تومان</span>
                                    <span>{p.price}</span>
                                </TableCell>
                                <TableCell>{p.description || "-"}</TableCell>
                                <TableCell className="text-right">
                                    {p.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
}
