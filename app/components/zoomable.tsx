import { type ReactNode, useEffect, useRef } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface ZoomableProps {
    children: ReactNode;
}

export default function Zoomable({ children }: ZoomableProps) {
    const zoomRef = useRef<any>(null);

    useEffect(() => {
        const handleBeforePrint = () => {
            zoomRef.current?.resetTransform();
        };

        window.addEventListener("beforeprint", handleBeforePrint);
        return () =>
            window.removeEventListener("beforeprint", handleBeforePrint);
    }, []);
    return (
        <TransformWrapper
            ref={zoomRef}
            initialScale={1}
            minScale={0.5}
            maxScale={3}
            wheel={{ step: 0.1 }}
            pinch={{ step: 5 }}
            doubleClick={{ disabled: true }}
            limitToBounds={false}
            centerOnInit={false}
        >
            <TransformComponent
                wrapperClass="
          w-screen h-screen
          overflow-auto
          flex justify-center items-start
        "
                contentClass="
          origin-top
          print:!transform-none
        "
            >
                {children}
            </TransformComponent>
        </TransformWrapper>
    );
}
