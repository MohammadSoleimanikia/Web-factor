import { Skeleton } from "@/features/shared/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

export default function ProductsSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-muted mt-3">
                    <TableHead>نام</TableHead>
                    <TableHead>توضیحات</TableHead>
                    <TableHead>قیمت فروش</TableHead>
                    <TableHead>قیمت خرید</TableHead>
                    <TableHead>عملیات</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                        <TableCell className="text-right">
                            <Skeleton className="h-5 w-32" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-32" />
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                            <Skeleton className="h-5 w-24" />
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                            <Skeleton className="h-5 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-10" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
