import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router";
import { Button } from "@/features/shared/components/ui/button";
import { Home, RefreshCw, ArrowRight, AlertTriangle } from "lucide-react";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    let title = "خطایی رخ داد";
    let message = "مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.";
    let code = "500";

    if (isRouteErrorResponse(error)) {
        code = String(error.status);
        if (error.status === 404) {
            title = "صفحه‌ای پیدا نشد";
            message = "صفحه‌ای که دنبالش می‌گردید وجود ندارد یا حذف شده است.";
        } else if (error.status === 403) {
            title = "دسترسی غیرمجاز";
            message = "شما مجاز به مشاهده این صفحه نیستید.";
        } else if (error.status === 401) {
            title = "احراز هویت نشده";
            message = "برای مشاهده این صفحه ابتدا وارد حساب کاربری خود شوید.";
        } else if (error.statusText) {
            message = error.statusText;
        }
    } else if (error instanceof Error) {
        message = import.meta.env.DEV ? error.message : message;
    }

    return (
        <div
            dir="rtl"
            className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 font-vazir"
        >
            {/* پس‌زمینه */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-destructive/5 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] rounded-full bg-destructive/8 blur-2xl" />
            </div>

            <div className="relative flex flex-col items-center gap-8 text-center max-w-md w-full">
                {/* آیکون و کد خطا */}
                <div className="relative select-none">
                    <span className="text-[10rem] sm:text-[12rem] font-black leading-none text-destructive/10 tracking-tighter">
                        {code}
                    </span>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center border border-destructive/20">
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                            ERROR {code}
                        </span>
                    </div>
                </div>

                {/* پیام خطا */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-foreground">
                        {title}
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* جزئیات در حالت DEV */}
                {import.meta.env.DEV && error instanceof Error && (
                    <div className="w-full rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-right">
                        <p className="text-xs font-mono text-destructive/80 break-all leading-relaxed">
                            {error.stack}
                        </p>
                    </div>
                )}

                {/* دکمه‌ها */}
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="gap-2"
                    >
                        <ArrowRight className="w-4 h-4" />
                        بازگشت
                    </Button>
                    <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        تلاش مجدد
                    </Button>
                    <Button
                        onClick={() => navigate("/dashboard")}
                        className="gap-2"
                    >
                        <Home className="w-4 h-4" />
                        صفحه اصلی
                    </Button>
                </div>
            </div>
        </div>
    );
}
