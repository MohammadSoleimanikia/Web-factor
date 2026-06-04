import { motion } from "motion/react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";

// Features Grid
export function Features() {
    const features = [
        {
            title: "قابلیت استفاده از بارکد خوان",
            description: "جهت سهولت افزودن کالا ها در فاکتور",
            icon: "📱",
        },
        {
            title: "لینک پرداخت و فاکتور",
            description: "قابلیت ایجاد لینک عمومی فاکتور برای مشتری",
            icon: "🔗",
        },
        {
            title: "مدیریت  کالاها",
            description: "ذخیره و مدیریت کالاها در پایگاه داده با قابلیت جستجو",
            icon: "📦",
        },
        {
            title: "برندینگ اختصاصی",
            description: "امکان افزودن رنگ تم، لوگو و اطلاعات فروشنده",
            icon: "🎨",
        },
        {
            title: "گزارش‌های مالی پیشرفته",
            description: "ارائه انواع گزارش‌های مالی و آنالیز داده‌های فروش",
            icon: "📊",
        },
        {
            title: "خروجی PDF حرفه‌ای",
            description: "ارائه خروجی فاکتور به فرمت PDF با قالب‌های متنوع",
            icon: "🖨️",
        },
        {
            title: "مدیریت مشتریان",
            description:
                "ذخیره اطلاعات مشتری برای سهولت استفاده در فاکتورهای بعدی",
            icon: "👤",
        },
        {
            title: "داشبورد تحلیلی",
            description: "نمودار درآمد و هزینه، شناسایی محصولات پرفروش",
            icon: "📈",
        },
    ];

    return (
        <section className="py-24" id="features">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        همه امکانات برای یک فاکتور حرفه‌ای
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        ابزارهای قدرتمند برای مدیریت فروش، در یک پلتفرم یکپارچه
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="h-full text-right border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="text-3xl mb-2">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-xl">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
