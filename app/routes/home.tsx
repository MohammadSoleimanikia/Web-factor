import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import Hero from "~/components/hero";
import About from "~/components/about";
import Footer from "@/components/footer";
import Header from "@/components/header";

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
