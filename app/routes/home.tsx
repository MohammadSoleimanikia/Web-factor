import type { Route } from "./+types/home";
import Hero from "~/components/home/hero";
import About from "@/components/home/about";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Invoice web app" },
        { name: "description", content: "Welcome to Invoice maker!" },
    ];
}

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <About />
            <Footer />
        </>
    );
}
