import { Moon,Sun } from "lucide-react";

import { useTheme } from "../themeProvider";
import { Button } from "../ui/button";
export default function ThemeToggler() {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button variant={"outline"} onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
    );
}