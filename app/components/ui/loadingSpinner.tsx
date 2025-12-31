import { Spinner } from "./spinner";

export default function LoadingSpinner({text}: {text?: string}) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <p>{text || "در حال بارگذاری..."}</p>
            <Spinner className="size-9 text-primary"/>
        </div>
    );
}