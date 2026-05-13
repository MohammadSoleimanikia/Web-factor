import { useTheme } from "@/features/shared/components/themeProvider";
import { NavLink } from "react-router";
export default function Hero() {
    const { theme } = useTheme();
    return (
        <section className="lg:pt-12  pt-0 container mx-auto h-full">
            <div className=" bg-muted rounded-lg py-10 overflow-hidden  2xl:py-16 xl:py-8   ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-14 items-center lg:grid-cols-12 lg:gap32">
                        <div className="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:mx-0">
                            <h1 className="py-8 text-center text-gray-900 dark:text-gray-500 font-bold font-manrope text-5xl lg:text-right leading-[70px]">
                                <span className="text-primary">
                                    فاکتور حرفه‌ای{" "}
                                </span>
                                بساز و همون لحظه برای مشتری بفرست
                            </h1>
                            <p className=" text-gray-500 text-lg text-center lg:text-right">
                                همه چیز برای ساخت، ارسال و مدیریت فاکتور در چند
                                ثانیه آماده است.
                            </p>
                            <NavLink to={"/dashboard"}>
                                <button className="bg-primary rounded-full mt-3 hover:-translate-y-2 py-3 px-7 text-base font-semibold text-white cursor-pointer transition-all duration-500 lg:w-fit w-full">
                                    شروع کنید
                                </button>
                            </NavLink>
                        </div>
                        <div className="w-full xl:col-span-7  lg:col-span-6 block">
                            <div className="w-full  sm:w-auto xl:ml-16 ">
                                <img
                                    src={
                                        theme == "dark"
                                            ? "/hero/dark.webp"
                                            : "/hero/light.webp"
                                    }
                                    alt="Dashboard image"
                                    className="rounded-xl object-cover w-full lg:hover:scale-120 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
