"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingOverlay from "@/components/global/loading-overlay";

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier, password }),
        });

        const data = await res.json();
        const role = data.role;

        if (!res.ok) {
            setError(data.error);
            setLoading(false);
            return;
        }

        // store token and role in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem(
            "medicalCenter",
            JSON.stringify(data.medicalCenter)
        );

        if (role === "receptionist")
            window.location.href = "/dashboard/receptionist/patients";
        if (role === "doctor") window.location.href = "/dashboard/doctor";
        if (role === "admin") window.location.href = "/dashboard/admin";
        if (role === "supplier") window.location.href = "/dashboard/supplier";
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            {loading && <LoadingOverlay />}
            <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow flex flex-col gap-5">
                <h1 className="text-2xl font-semibold text-center">Log In</h1>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Input
                    placeholder="Email or Username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button className="w-full" onClick={handleLogin}>
                    Login
                </Button>
            </div>
        </div>
    );
}
