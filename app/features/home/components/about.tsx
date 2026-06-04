import { motion } from "motion/react";

import AboutCard from "./aboutCard";

export default function About() {
    return (
        <motion.div
            className="flex  mx-auto mb-10"
            id="about"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
            {/* context */}
            <div className="p-5  container rounded mx-auto pt-3 sm:pt-8 md:pt-14">
                <div className="flex flex-col"></div>
                <h2 className="mb-10  font-bold text-xl">
                    با چند کلیک فاکتور بساز، و لینک فاکتور رو با لینک پرداخت به
                    مشتری بفرست . بدون دردسر، بدون پیچیدگی.
                </h2>

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
                    <AboutCard
                        title="قابلیت استفاده از بارکد خوان"
                        description="جهت سهولت افزودن کالا ها در فاکتور "
                        url="/about-icons/qr.svg"
                    />
                    <AboutCard
                        title="قابلیت ایجاد لینک پرداخت"
                        description="قابلیت ایجاد لینک عمومی فاکتور برای مشتری"
                        url="/about-icons/pay.svg"
                    />
                    <AboutCard
                        title="ذخیره و مدیریت کالاها"
                        description="ذخیره کالا ها در پایگاه داده "
                        url="/about-icons/cart.svg"
                    />
                    <AboutCard
                        title="شخصی سازی فاکتور و برندینگ"
                        description="امکان افزودن رنگ تم فاکتور و لوگو و اطلاعات تماس فروشنده"
                        url="/about-icons/theme.svg"
                    />
                    <AboutCard
                        title="گزارش های مالی و آماری"
                        description="ارائه انواع گزارش های مالی و آماری دوره ای و آنالیز داده های فروشنده"
                        url="/about-icons/report.svg"
                    />
                    <AboutCard
                        title="خروجی با فرمت PDF"
                        description="ارائه خروجی فاکتور به فرمت PDF برای ذخیره در فضای محلی"
                        url="/about-icons/print.svg"
                    />
                    <AboutCard
                        title="مدیریت مشتری"
                        description="ذخیره اطلاعات مشتری برای سهولت افزودن اطلاعات مشتری در فاکتور در مراجعات بعدی "
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
