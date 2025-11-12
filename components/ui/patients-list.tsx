"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import PatientRowCard from "@/components/ui/patient-row-card";
import { Card } from "@/components/ui/card";
import { PatientFormDrawer } from "./patient-form-drawer";

export default function PatientsList({ patients }) {
    const [query, setQuery] = useState("");

    const filtered = patients.filter(
        (p) =>
            `${p.firstName} ${p.lastName}`
                .toLowerCase()
                .includes(query.toLowerCase()) ||
            p.email?.toLowerCase().includes(query.toLowerCase()) ||
            p.phoneNumber?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-6">
                <Input
                    placeholder="Search for a patient"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex-1">
                    {" "}
                    {/* search bar will go here inside the list component */}
                </div>
                <PatientFormDrawer />
            </div>

            <Card className="rounded-xl shadow-sm transition">
                {filtered.map((p) => (
                    <PatientRowCard
                        key={p.id}
                        id={p.id}
                        name={`${p.firstName} ${p.lastName}`}
                        email={p.email ?? "Not provided"}
                        phone={p.phoneNumber ?? "Not provided"}
                    />
                ))}

                {filtered.length === 0 && (
                    <p className="p-4 text-sm text-muted-foreground">
                        No results.
                    </p>
                )}
            </Card>
        </div>
    );
}
