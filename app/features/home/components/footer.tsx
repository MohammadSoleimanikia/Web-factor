import { Link } from "react-router";

// Footer
export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="/logo.svg"
                                className="h-8 w-auto"
                                alt="وب فاکتور"
                            />
                            <span className="text-white font-bold text-lg">
                                وب فاکتور
                            </span>
                        </div>
                        <p className="text-sm">
                            سامانه  صدور فاکتور، مدیریت فروش و مشتریان
                        </p>
                        <div className="mt-4 text-xs">
                            © ۱۴۰۵ وب فاکتور. تمام حقوق محفوظ است.
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            دسترسی سریع
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-white transition"
                                >
                                    صفحه اصلی
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="hover:text-white transition"
                                >
                                    پنل کاربری
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/demo"
                                    className="hover:text-white transition"
                                >
                                    ساخت رایگان فاکتور
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            تماس با ما
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>09387051245</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
