import About from "@/components/home/about";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";



export function meta() {
    return [
        { title: "Invoice web app" },
        { name: "description", content: "Welcome to Invoice maker!" },
    ];
}

export default function Home() {
    return (
        <main className="mx-auto ">
            <Header />
            <Hero />
            <About />
            <Footer />
        </main>
    );
}
