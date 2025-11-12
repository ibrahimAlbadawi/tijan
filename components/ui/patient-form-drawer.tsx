"use client";

import { useState, useEffect } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarPlus, CalendarIcon, Pencil } from "lucide-react";
import { format } from "date-fns";

interface Patient {
    id?: number;
    firstName: string;
    lastName: string;
    email?: string;
    dateOfBirth: Date | string;
    phoneNumber?: string;
    gender: string;
    nationality?: string;
    address?: string;
    medicalCenterId?: number;
}

interface PatientFormDrawerProps {
    patient?: Patient; // If provided, we're in edit mode
    trigger?: React.ReactNode; // Custom trigger component
}

export function PatientFormDrawer({
    patient,
    trigger,
}: PatientFormDrawerProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState<Date>();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        nationality: "",
        address: "",
    });

    // Initialize form data when patient changes or drawer opens
    useEffect(() => {
        if (patient) {
            setFormData({
                firstName: patient.firstName || "",
                lastName: patient.lastName || "",
                email: patient.email || "",
                phoneNumber: patient.phoneNumber || "",
                gender: patient.gender || "",
                nationality: patient.nationality || "",
                address: patient.address || "",
            });

            // Set date of birth
            if (patient.dateOfBirth) {
                const dob =
                    typeof patient.dateOfBirth === "string"
                        ? new Date(patient.dateOfBirth)
                        : patient.dateOfBirth;
                setDateOfBirth(dob);
            }
        } else {
            // Reset form for new patient
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                gender: "",
                nationality: "",
                address: "",
            });
            setDateOfBirth(undefined);
        }
    }, [patient, open]);

    const isEditMode = !!patient;

    async function handleSubmit(formData: FormData) {
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const gender = formData.get("gender") as string;
        const nationality = formData.get("nationality") as string;
        const address = formData.get("address") as string;

        setLoading(true);

        try {
            const url = isEditMode
                ? `/api/patients/${patient.id}` // Use the route with [id]
                : "/api/patients";

            const method = isEditMode ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email: email || null,
                    dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : null,
                    phoneNumber: phoneNumber || null,
                    gender: gender || "prefer_not_to_say",
                    nationality: nationality || null,
                    address: address || null,
                    medicalCenterId: 1,
                }),
            });

            // Check if response is OK before trying to parse JSON
            if (!response.ok) {
                // Try to get error message from response
                let errorMessage = `Failed to ${
                    isEditMode ? "update" : "create"
                } patient`;

                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch {
                    // If we can't parse JSON, use status text
                    errorMessage = response.statusText || errorMessage;
                }

                throw new Error(errorMessage);
            }

            // Success - reload or update state
            window.location.reload();
        } catch (error) {
            console.error(
                `Failed to ${isEditMode ? "update" : "create"} patient:`,
                error
            );

            // Show error to user (you might want to use a toast or alert)
            let errorMessage = `Failed to ${
                isEditMode ? "update" : "create"
            } patient`;

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            alert(errorMessage);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {trigger || (
                    <Button>
                        {isEditMode ? (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Profile
                            </>
                        ) : (
                            <>
                                <CalendarPlus className="h-4 w-4 mr-2" />
                                Add New Patient
                            </>
                        )}
                    </Button>
                )}
            </DrawerTrigger>
            <DrawerContent className="text-lg">
                <form action={handleSubmit}>
                    <div className="mx-auto w-full max-w-sm max-h-[80vh] overflow-y-auto">
                        <DrawerHeader>
                            <DrawerTitle className="text-3xl font-bold">
                                {isEditMode
                                    ? "Edit Patient Profile"
                                    : "Add New Patient"}
                            </DrawerTitle>
                            <DrawerDescription className="text-lg">
                                {isEditMode
                                    ? "Update the patient information below."
                                    : "Add a new patient to your system."}
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-6 pb-0 space-y-6">
                            {/* First Name - Required */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="firstName"
                                    className="text-lg font-medium"
                                >
                                    First Name *
                                </Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    required
                                    className="text-lg h-12"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "firstName",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Last Name - Required */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="lastName"
                                    className="text-lg font-medium"
                                >
                                    Last Name *
                                </Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                    required
                                    className="text-lg h-12"
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "lastName",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Email - Optional */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="email"
                                    className="text-lg font-medium"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="text-lg h-12"
                                    value={formData.email}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Phone Number - Optional */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="phoneNumber"
                                    className="text-lg font-medium"
                                >
                                    Phone Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    className="text-lg h-12"
                                    value={formData.phoneNumber}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "phoneNumber",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Gender - Required with default */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="gender"
                                    className="text-lg font-medium"
                                >
                                    Gender *
                                </Label>
                                <Select
                                    name="gender"
                                    required
                                    value={formData.gender}
                                    onValueChange={(value) =>
                                        handleInputChange("gender", value)
                                    }
                                >
                                    <SelectTrigger className="text-lg h-12">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent className="text-lg">
                                        <SelectItem
                                            value="male"
                                            className="text-lg"
                                        >
                                            Male
                                        </SelectItem>
                                        <SelectItem
                                            value="female"
                                            className="text-lg"
                                        >
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Date of Birth - Required with Calendar */}
                            <div className="space-y-3">
                                <Label className="text-lg font-medium">
                                    Date of Birth *
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal text-lg h-12"
                                        >
                                            <CalendarIcon className="mr-2 h-5 w-5" />
                                            {dateOfBirth
                                                ? format(dateOfBirth, "PPP")
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={dateOfBirth}
                                            onSelect={setDateOfBirth}
                                            disabled={(date) =>
                                                date > new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <input
                                    type="hidden"
                                    name="dateOfBirth"
                                    value={dateOfBirth?.toISOString() || ""}
                                    required
                                />
                            </div>

                            {/* Nationality - Optional */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="nationality"
                                    className="text-lg font-medium"
                                >
                                    Nationality
                                </Label>
                                <Input
                                    id="nationality"
                                    name="nationality"
                                    placeholder="American"
                                    className="text-lg h-12"
                                    value={formData.nationality}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "nationality",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Address - Optional */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="address"
                                    className="text-lg font-medium"
                                >
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="123 Main St, City, State, ZIP Code"
                                    className="text-lg h-12"
                                    value={formData.address}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "address",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <DrawerFooter className="p-6">
                            <Button
                                type="submit"
                                className="text-lg h-12"
                                disabled={loading || !dateOfBirth}
                            >
                                {loading
                                    ? `${
                                          isEditMode ? "Updating" : "Adding"
                                      } Patient...`
                                    : `${
                                          isEditMode ? "Update" : "Add"
                                      } Patient`}
                            </Button>
                            <DrawerClose asChild>
                                <Button
                                    variant="outline"
                                    className="text-lg h-12"
                                >
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
