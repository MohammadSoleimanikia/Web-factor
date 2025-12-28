import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHeader,
    TableHead,
} from "@/components/ui/table";

export default function CustomersSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>نام</TableHead>
                    <TableHead>ایمیل</TableHead>
                    <TableHead>شماره تلفن</TableHead>
                    <TableHead>آدرس</TableHead>
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
