"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4 px-6">
            <h1 className="text-3xl font-semibold">Page Not Found</h1>
            <p className="text-muted-foreground max-w-sm">
                The page you are looking for doesn’t exist or has been moved.
            </p>

            <button
                onClick={() => router.back()}
                className="underline text-[var(--primary-color)] hover:opacity-80 transition"
            >
                Go back
            </button>
        </div>
    );
}
