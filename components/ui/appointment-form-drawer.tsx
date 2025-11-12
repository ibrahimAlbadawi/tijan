// app/receptionist/patient/[id]/appointment-form-drawer.tsx

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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarPlus, CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

interface AppointmentFormDrawerProps {
    patientId: number;
    doctors: { id: number; user: { firstName: string; lastName: string } }[];
}

export function AppointmentFormDrawer({
    patientId,
    doctors,
}: AppointmentFormDrawerProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<string>("09:00");
    const [doctorId, setDoctorId] = useState<string>("");

    // Generate time slots
    const timeSlots = [];
    for (let hour = 8; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, "0")}:${minute
                .toString()
                .padStart(2, "0")}`;
            timeSlots.push(timeString);
        }
    }

    async function handleSubmit(formData: FormData) {
        const caseDescription = formData.get("caseDescription") as string;
        const status = formData.get("status") as string;

        if (!date) {
            alert("Please select a date");
            return;
        }
        if (!doctorId) {
            alert("Please select a doctor");
            return;
        }

        // Combine date and time
        const [hours, minutes] = time.split(":");
        const appointmentDateTime = new Date(date);
        appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));

        setLoading(true);

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    appointmentDateTime: appointmentDateTime.toISOString(),
                    caseDescription,
                    status: status || "confirmed",
                    patientId,
                    doctorId: Number(doctorId),
                }),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error("Failed to create appointment:", errorData);
            }
        } catch (error) {
            console.error("Failed to create appointment:", error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="flex items-center gap-2 text-lg h-12 px-6">
                    <CalendarPlus className="h-5 w-5" />
                    Add New Appointment
                </Button>
            </DrawerTrigger>
            <DrawerContent className="text-lg">
                <form action={handleSubmit}>
                    <div className="mx-auto w-full max-w-sm max-h-[80vh] overflow-y-auto">
                        <DrawerHeader>
                            <DrawerTitle className="text-3xl font-bold">
                                Schedule New Appointment
                            </DrawerTitle>
                            <DrawerDescription className="text-lg">
                                Create a new appointment for this patient.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-6 pb-0 space-y-6">
                            {/* Date Picker */}
                            <div className="space-y-3">
                                <Label className="text-lg font-medium">
                                    Appointment Date *
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal text-lg h-12"
                                        >
                                            <CalendarIcon className="mr-2 h-5 w-5" />
                                            {date
                                                ? format(date, "PPP")
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Time Picker */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="time"
                                    className="text-lg font-medium"
                                >
                                    Appointment Time *
                                </Label>
                                <Select value={time} onValueChange={setTime}>
                                    <SelectTrigger className="text-lg h-12">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5" />
                                            <SelectValue placeholder="Select time" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[200px]">
                                        {timeSlots.map((timeSlot) => (
                                            <SelectItem
                                                key={timeSlot}
                                                value={timeSlot}
                                                className="text-lg"
                                            >
                                                {timeSlot}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-lg font-medium">
                                    Doctor *
                                </Label>
                                <Select
                                    value={doctorId}
                                    onValueChange={setDoctorId}
                                    required
                                >
                                    <SelectTrigger className="text-lg h-12">
                                        <SelectValue placeholder="Select doctor" />
                                    </SelectTrigger>
                                    <SelectContent className="text-lg">
                                        {doctors.map((d) => (
                                            <SelectItem
                                                key={d.id}
                                                value={`${d.id}`}
                                                className="text-lg"
                                            >
                                                {d.user.firstName}{" "}
                                                {d.user.lastName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Case Description - Required */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="caseDescription"
                                    className="text-lg font-medium"
                                >
                                    Case Description *
                                </Label>
                                <Textarea
                                    id="caseDescription"
                                    name="caseDescription"
                                    placeholder="Describe the reason for this appointment..."
                                    required
                                    className="text-lg min-h-[100px] resize-vertical"
                                />
                            </div>

                            {/* Status - Required with default */}
                            <div className="space-y-3">
                                <Label
                                    htmlFor="status"
                                    className="text-lg font-medium"
                                >
                                    Status *
                                </Label>
                                <Select
                                    name="status"
                                    required
                                    defaultValue="confirmed"
                                >
                                    <SelectTrigger className="text-lg h-12">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="text-lg">
                                        <SelectItem
                                            value="confirmed"
                                            className="text-lg"
                                        >
                                            Confirmed
                                        </SelectItem>
                                        <SelectItem
                                            value="pending"
                                            className="text-lg"
                                        >
                                            Pending
                                        </SelectItem>
                                        <SelectItem
                                            value="cancelled"
                                            className="text-lg"
                                        >
                                            Cancelled
                                        </SelectItem>
                                        <SelectItem
                                            value="completed"
                                            className="text-lg"
                                        >
                                            Completed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DrawerFooter className="p-6">
                            <Button
                                type="submit"
                                className="text-lg h-12"
                                disabled={loading || !date}
                            >
                                {loading
                                    ? "Scheduling..."
                                    : "Schedule Appointment"}
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
