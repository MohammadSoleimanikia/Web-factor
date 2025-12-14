import { motion } from "motion/react";
import AboutCard from "./aboutCard";

export default function About() {
    return (
        <motion.div
            className="min-h-screen flex  container mx-auto mb-10"
            id="about"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
            {/* context */}
            <div className="w-11/12 shadow-lg bg-white rounded mx-auto p-3 sm:p-8 md:p-14">
                <div className="flex flex-col"></div>
                <h2 className="mb-10  font-bold text-xl">
                    با چند کلیک فاکتور بساز، و لینک فاکتور رو با لینک پرداخت به
                    مشتری بفرست . بدون دردسر، بدون پیچیدگی.
                </h2>

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
                    <AboutCard
                        title="تولید فاکتور با QR  لینک فاکتور"
                        description="جهت سهولت دسترسی به لینک فاکتور ها در آینده"
                        url="/about-icons/qr.svg"
                    />
                    <AboutCard
                        title="ارسال لینک پرداخت"
                        description="ارسال لینک پراخت پس از تولید فاکتور به شماره مشتری"
                        url="/about-icons/pay.svg"
                    />
                    <AboutCard
                        title="ذخیره و مدیریت کالاها"
                        description="موجودی انبار یا تعداد محصول در دسترس، دسته‌بندی محصولات و دادن پیشنهاد هنگام پر کردن فاکتورها"
                        url="/about-icons/cart.svg"
                    />
                    <AboutCard
                        title="شخصی سازی فاکتور و برندینگ"
                        description="امکان افزودن لوگو و رنگ برند و مهر و امضای فروشنده"
                        url="/about-icons/theme.svg"
                    />
                    <AboutCard
                        title="گزارش های مالی و آماری"
                        description="ارائه انواع گزارش های مالی و آماری دوره ای و آنالیز داده های فروشنده"
                        url="/about-icons/report.svg"
                    />
                    <AboutCard
                        title="خروجی با فرمت های مختلف"
                        description="ارائه خروجی فاکتور به فرمت های مختلف و قابلیت ذخیره در فایل های محلی"
                        url="/about-icons/print.svg"
                    />
                    <AboutCard
                        title="مدیریت مشتری"
                        description="لیست مشتری ها با جزئیات تماس، تاریخچه فاکتور ها برای هر مشتری و هشدار برای مشتریان بدهکار یا دیر پرداخت"
                        url="/about-icons/customer.svg"
                    />
                    <AboutCard
                        title="ابزاری تحلیل و داشبورد"
                        description="نمودار درآمد و هزینه بر اساس بازه زمانی، شناسایی محصولات پرفروش و کم فروش"
                        url="/about-icons/chart.svg"
                    />
                </div>
            </div>
        </motion.div>
    );
}
