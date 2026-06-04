import { Link, NavLink } from "react-router";

import { Button } from "@/features/shared/components/ui/button";

// CTA Section
export function CTA() {
    return (
        <section className="py-24 bg-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    آماده شروع هستید؟
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                    همین حالا ثبت‌نام کنید و اولین فاکتور حرفه‌ای خود را بسازید.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <NavLink to="/dashboard">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="w-full sm:w-auto gap-2"
                        >
                            شروع کنید
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Button>
                    </NavLink>
                    <Link to="/demo">
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-primary"
                        >
                            نسخه آزمایشی
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
