import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
export default function DeleteConfirm({ onConfirm, title }: { onConfirm: () => void, title?: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="destructive">
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        این عمل غیرقابل بازگشت است. آیا مطمئن هستید که می‌خواهید
                        این {title} را حذف کنید؟
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>انصراف</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>حذف</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
