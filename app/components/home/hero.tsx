import { motion } from "motion/react";
import { NavLink } from "react-router";

import { Button } from "../ui/button";
export default function Hero() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        aboutSection?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.6,
            }}
            className="container mx-auto mt-10 md:mt-0 min-h-[calc(100vh-80px)] flex flex-col sm:flex-row  sm:justify-between  items-center"
        >
            <div className="w-full sm:w-3/6  flex flex-col gap-3 space-y-0 md:space-y-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    سریع، دقیق، آماده چاپ
                </h1>
                
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl ">
                    فاکتور حرفه‌ای بساز و همون لحظه برای مشتری بفرست.
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-xl font-light text-gray-600 dark:text-gray-400">
                    یه فاکتور‌ساز سریع و مخصوص فروشگاه‌های آنلاین؛ محصولاتو
                    اضافه کن، فاکتور بساز، آنلاین برای مشتری بفرست و با QR Code
                    همیشه قابل دسترس نگهش دار. همه‌چی ساده، تمیز و بدون دردسر.
                </p>
                <div className="flex gap-3 mt-2">
                    <NavLink to={"/dashboard"}>
                        <Button>شروع کنید</Button>
                    </NavLink>
                    <Button variant={"outline"} onClick={scrollToAbout}>
                        درباره ما
                    </Button>
                </div>
            </div>
            <img
                className="sm:w-3/6  w-full sm:block mt-5"
                src="/hero-section.svg"
                alt=""
            />
        </motion.div>
    );
}
