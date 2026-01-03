import About from "@/components/home/about";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "~/components/home/hero";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Invoice web app" },
        { name: "description", content: "Welcome to Invoice maker!" },
    ];
}

export default function Home() {
    return (
        <main className="mx-auto px-4 sm:px-10 md:px-20 lg:px-32">
            <Header />
            <Hero />
            <About />
            <Footer />
        </main>
    );
}
