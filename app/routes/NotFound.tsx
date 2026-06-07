import { useNavigate } from "react-router";
import { Button } from "@/features/shared/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div
            dir="rtl"
            className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 font-vazir"
        >
            {/* بافت پس‌زمینه */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/8 blur-2xl" />
            </div>

            <div className="relative flex flex-col items-center gap-8 text-center max-w-md">
                {/* عدد ۴۰۴ */}
                <div className="relative select-none">
                    <span className="text-[10rem] sm:text-[12rem] font-black leading-none text-primary/10 tracking-tighter">
                        ۴۰۴
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[12rem] font-black leading-none text-primary/20 tracking-tighter blur-sm">
                        ۴۰۴
                    </span>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-primary tracking-tight">
                            ۴۰۴
                        </span>
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                            NOT FOUND
                        </span>
                    </div>
                </div>

                {/* پیام */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-foreground">
                        صفحه‌ای پیدا نشد
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                        صفحه‌ای که دنبالش می‌گردید وجود ندارد، حذف شده یا آدرس
                        آن تغییر کرده است.
                    </p>
                </div>

                {/* دکمه‌ها */}
                <div className="flex items-center gap-3">
                    <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
                        <ArrowRight className="w-4 h-4" />
                        بازگشت
                    </Button>
                    <Button onClick={() => navigate("/dashboard")} className="gap-2">
                        <Home className="w-4 h-4" />
                        صفحه اصلی
                    </Button>
                </div>
            </div>
        </div>
    );
}
