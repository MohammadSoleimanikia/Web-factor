import { Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type SharePublicLinkDialogProps = {
    invoiceToken: string;
};

export default function SharePublicLinkDialog({
    invoiceToken,
}: SharePublicLinkDialogProps) {
    const [open, setOpen] = useState(false);

    const publicUrl = `${window.location.origin}/public/${invoiceToken}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(publicUrl);
        toast.success("لینک با موفقیت کپی شد");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" title="اشتراک لینک عمومی">
                    <Share2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>اشتراک لینک عمومی</DialogTitle>
                    <DialogDescription>
                        از این لینک برای اشتراک فاکتور بدون نیاز به ورود استفاده
                        کنید
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 gap-2">
                    <Input
                        readOnly
                        value={publicUrl}
                        className="flex-1"
                        dir="ltr"
                    />
                    <Button
                        type="button"
                        size="icon"
                        onClick={handleCopy}
                        title="کپی لینک"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
