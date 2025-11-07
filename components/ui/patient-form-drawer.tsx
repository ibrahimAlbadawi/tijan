"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function PatientFormDrawer() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Function to format date for input[type="date"]
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    async function handleSubmit(formData: FormData) {
        const fullName = formData.get("fullName") as string;
        const phone = formData.get("phone") as string;
        const gender = formData.get("gender") as string;
        const birthdate = formData.get("birthdate") as string;
        const email = formData.get("email") as string;
        const address = formData.get("address") as string;
        setLoading(true);

        try {
            const response = await fetch("/api/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    phone,
                    gender,
                    birthdate: birthdate
                        ? new Date(birthdate).toISOString()
                        : null,
                    email,
                    address,
                }),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error("Failed to create patient");
            }
        } catch (error) {
            console.error("Failed to create patient:", error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button>Add New Patient</Button>
            </DrawerTrigger>
            <DrawerContent className="text-lg">
                <form action={handleSubmit}>
                    <div className="mx-auto w-full max-w-sm max-h-[80vh] overflow-y-auto">
                        <DrawerHeader>
                            <DrawerTitle className="text-3xl font-bold">
                                Add New Patient
                            </DrawerTitle>
                            <DrawerDescription className="text-lg">
                                Add a new patient to your system.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-6 pb-0 space-y-6">
                            {/* Full Name - Required */}
                            <div className="space-y-3">
                                <Label htmlFor="fullName" className="text-lg font-medium">
                                    Full Name *
                                </Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="John Doe"
                                    required
                                    className="text-lg h-12"
                                />
                            </div>

                            {/* Email - Optional */}
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-lg font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="text-lg h-12"
                                />
                            </div>

                            {/* Phone - Optional */}
                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-lg font-medium">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    className="text-lg h-12"
                                />
                            </div>

                            {/* Gender - Optional */}
                            <div className="space-y-3">
                                <Label htmlFor="gender" className="text-lg font-medium">
                                    Gender
                                </Label>
                                <Select name="gender">
                                    <SelectTrigger className="text-lg h-12">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent className="text-lg">
                                        <SelectItem value="male" className="text-lg">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female" className="text-lg">
                                            Female
                                        </SelectItem>
                                        <SelectItem value="other" className="text-lg">
                                            Other
                                        </SelectItem>
                                        <SelectItem value="prefer_not_to_say" className="text-lg">
                                            Prefer not to say
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Birthdate - Optional */}
                            <div className="space-y-3">
                                <Label htmlFor="birthdate" className="text-lg font-medium">
                                    Birthdate
                                </Label>
                                <Input
                                    id="birthdate"
                                    name="birthdate"
                                    type="date"
                                    className="text-lg h-12"
                                    // Set max date to today to prevent future dates
                                    max={getTodayDate()}
                                    // You can also set a reasonable min date (e.g., 150 years ago)
                                    min="1900-01-01"
                                />
                            </div>

                            {/* Address - Optional */}
                            <div className="space-y-3">
                                <Label htmlFor="address" className="text-lg font-medium">
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="123 Main St, City, State"
                                    className="text-lg h-12"
                                />
                            </div>
                        </div>
                        <DrawerFooter className="p-6">
                            <Button 
                                type="submit" 
                                className="text-lg h-12" 
                                disabled={loading}
                            >
                                {loading ? "Adding Patient..." : "Add Patient"}
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline" className="text-lg h-12">
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </form>
            </DrawerContent>
        </Drawer>
    );
}