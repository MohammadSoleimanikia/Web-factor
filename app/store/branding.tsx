import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BrandingContextType } from "@/types/brandingContext";
import { generateBrandingColors } from "@/lib/brandingColors";

const useBranding = create<BrandingContextType>()(
    persist(
        (set) => ({
            color: null,
            colors: {
                base: "#257f8d",
                text:"#ffffff",
                muted: "#d9e6e9",
                border: "#c2d1d4",
                hover: "#b0dae0",
            },
            logo: null,

            setColor: (color: string) => {
                const colors = generateBrandingColors(color);
                set({ color, colors });
            },

            setLogo: (logo: string) => set({ logo }),
        }),
        {
            name: "branding",
        }
    )
);

export default useBranding;
