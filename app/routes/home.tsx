// app/routes/home.tsx
import { motion } from "motion/react";

import { CTA } from "@/features/home/components/cta";
import { Features } from "@/features/home/components/features";
import { Footer } from "@/features/home/components/footer";
import { Header } from "@/features/home/components/header";
import { Hero } from "@/features/home/components/hero";
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/features/shared/components/ui/card";

// How It Works
function HowItWorks() {
    const steps = [
        {
            title: "ثبت اطلاعات",
            description: "اطلاعات فاکتور، مشتری و کالاها را وارد کنید",
            icon: "✍️",
        },
        {
            title: "ساخت فاکتور",
            description: "با یک کلیک فاکتور حرفه‌ای خود را بسازید",
            icon: "⚡",
        },
        {
            title: "ارسال لینک",
            description: "لینک فاکتور را برای مشتری ارسال کنید",
            icon: "🔗",
        },
    ];

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        در سه قدم به فروش برسید
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        فرآیند ساده و سریع برای صدور فاکتور
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                            )}
                            <Card className="text-center p-6 border-0 shadow-lg">
                                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-4">
                                    {index + 1}
                                </div>
                                <CardTitle className="mb-2">
                                    {step.title}
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-400">
                                    {step.description}
                                </CardDescription>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Main Home Component
export function meta() {
    return [
        { title: "وب فاکتور | سامانه حرفه‌ای صدور فاکتور آنلاین" },
        {
            name: "description",
            content:
                "ساخت، مدیریت و ارسال فاکتور حرفه‌ای با وب فاکتور. مناسب فروشگاه‌ها، شرکت‌ها و کسب‌وکارهای آنلاین",
        },
        {
            name: "keywords",
            content: "فاکتور, ساخت فاکتور, مدیریت فروش, صدور فاکتور آنلاین",
        },
    ];
}

export default function Home() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
            <Footer />
        </main>
    );
}
