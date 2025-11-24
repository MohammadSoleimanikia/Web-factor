import { motion } from "motion/react";
import AboutCard from "./aboutCard";

export default function About() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
        >
            <div className="h-screen flex items-center container mx-auto">
                {/* context */}
                <div className="w-11/12 shadow-lg bg-white rounded mx-auto p-3 sm:p-8 md:p-16">
                    
                    <h2 className=" sm:w-7/12 mb-10  font-bold text-xl">
                        با چند کلیک فاکتور بساز، و لینک فاکتور رو با لینک پرداخت
                        به مشتری بفرست . بدون دردسر، بدون پیچیدگی.
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
                            description="ذخیره و مدیریت کالا ها و دادن پیشنهاد جهت سهولت وارد کردن اطلاعات"
                            url="/about-icons/cart.svg"
                        />
                        <AboutCard
                            title="شخصی سازی فاکتور و برندینگ"
                            description="امکان افزودن لوگو و رنگ برند و مهر و امضای فروشنده"
                            url="/about-icons/theme.svg"
                        />
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
