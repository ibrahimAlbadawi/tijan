"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRoot() {
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem("tijan_role");

        switch (role) {
            case "receptionist":
                router.replace("/dashboard/receptionist/patients");
                break;

            case "doctor":
                router.replace("/dashboard/doctor");
                break;

            case "admin":
                router.replace("/dashboard/admin");
                break;

            case "supplier":
                router.replace("/dashboard/supplier");
                break;

            default:
                router.replace("/login"); // fallback if weird role or missing
                break;
        }
    }, [router]);

    return null;
}
