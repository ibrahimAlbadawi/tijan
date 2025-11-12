'use client';

import { CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface PatientRowCardProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    //lastVisit: string;
    onView?: () => void;
}

export default function PatientRowCard({
    id,
    name,
    email,
    phone,
    //lastVisit,
    onView,
}: PatientRowCardProps) {
    const router = useRouter();
    return (
            <CardContent className="items-center justify-between px-4 py-1 gap-6">
                <div
                    // go to that specific patient's page on click
                    onClick={() => router.push(`/dashboard/receptionist/patients/${id}`)}
                    className="rounded-xl border px-4 py-5 flex items-center justify-between hover:bg-accent cursor-pointer transition"
                >
                    <div className="w-[24%] font-medium text-xl truncate">
                        {name}
                    </div>

                    <div className="w-[24%] text-sm text-muted-foreground truncate">
                        {email}
                    </div>

                    <div className="w-[18%] text-sm text-muted-foreground truncate">
                        {phone}
                    </div>

                    {/* <div className="w-[18%] text-sm text-muted-foreground truncate">
                        {lastVisit}
                    </div> */}

                    <button
                        onClick={onView}
                        className="w-[6%] flex justify-center hover:opacity-80 transition"
                    >
                        <Eye className="h-5 w-5" />
                    </button>
                </div>
            </CardContent>
    );
}
