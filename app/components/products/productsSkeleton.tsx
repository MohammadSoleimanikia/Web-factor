import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ProductsSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>نام</TableHead>
                    <TableHead>توضیحات</TableHead>
                    <TableHead>قیمت</TableHead>
                    <TableHead>عملیات</TableHead>
                    
                </TableRow>
            </TableHeader>

            <TableBody>
                {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Skeleton className="h-5 w-32" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-48" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-20" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
