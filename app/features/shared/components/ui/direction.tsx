import * as React from "react";

type DirectionContextType = {
    dir: "ltr" | "rtl";
};

const DirectionContext = React.createContext<DirectionContextType | undefined>(
    undefined,
);

function DirectionProvider({
    dir = "ltr",
    children,
}: {
    dir?: "ltr" | "rtl";
    children: React.ReactNode;
}) {
    return (
        <DirectionContext.Provider value={{ dir }}>
            {children}
        </DirectionContext.Provider>
    );
}

function useDirection() {
    const context = React.useContext(DirectionContext);
    if (!context) {
        return { dir: "ltr" as const };
    }
    return context;
}

export { DirectionProvider, useDirection };
