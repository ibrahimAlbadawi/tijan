"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { images } from "@/constants/images";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type NavLink = {
    name: string;
    href: string;
};

interface MedicalCenter {
    id: number;
    name: string;
}

export default function HeaderDashboard() {
    const [role, setRole] = useState<string | null>(null);
    const [medicalCenter, setMedicalCenter] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const r = localStorage.getItem("role");
        const medicalCenterData = localStorage.getItem("medicalCenter");

        setRole(r);
        if (medicalCenterData) {
            const medicalCenterObj = JSON.parse(medicalCenterData);
            setMedicalCenter(medicalCenterObj.name); // This sets just the string name
        } else {
            setMedicalCenter(null);
        }
        setLoading(false);
    }, []);

    const receptionistLinks: NavLink[] = [
        { name: "Patients", href: "/dashboard/receptionist/patients" },
        { name: "Appointments", href: "/dashboard/receptionist/appointments" },
        {
            name: "Notifications",
            href: "/dashboard/receptionist/notifications",
        },
    ];

    let links: NavLink[] = [];
    if (role === "receptionist") links = receptionistLinks;

    return (
        <nav className="sticky top-0 z-50 h-[120px] backdrop-blur-md bg-white/70 border-b flex items-center justify-between px-6">
            {/* LOGO */}
            <div className="flex items-center gap-2 group relative">
                <Image
                    src={images.icon_colored}
                    alt="Tijan Logo"
                    width={60}
                    height={60}
                    className="transition-transform duration-300 group-hover:scale-110"
                />

                <span className="text-2xl font-semibold opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    {loading ? "Loading..." : medicalCenter || "Medical Center"}
                </span>
            </div>

            {/* MIDDLE LINKS */}
            <div className="flex items-center gap-6 mr-30">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-2xl font-medium hover:text-[var(--primary-color)] hover:scale-120 transition-all duration-300"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* USER AVATAR */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="w-16 h-16 rounded-full bg-gray-300 cursor-pointer" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("role");
                            window.location.href = "/";
                        }}
                        className="cursor-pointer text-red-600 font-medium"
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
}
