import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../features/shared/components/themeProvider";
import { Button } from "../../features/shared/components/ui/button";
export default function ThemeToggler() {
    const { setTheme, theme } = useTheme();
    const buttonLabel =
        theme === "dark" ? "تغییر به حالت روشن" : "تغییر به حالت تاریک";
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant={"outline"}
            onClick={toggleTheme}
            aria-label={buttonLabel}
            title={buttonLabel}
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </Button>
    );
}
