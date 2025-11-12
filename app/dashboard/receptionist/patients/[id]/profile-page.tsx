// app/receptionist/patient/[id]/client-page.tsx
"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { AppointmentFormDrawer } from "@/components/ui/appointment-form-drawer";
import { Pencil } from "lucide-react";
import { PatientFormDrawer } from "@/components/ui/patient-form-drawer";
import { DollarSign, AlertCircle, Calendar, CreditCard } from "lucide-react";

interface ClientPatientProfilePageProps {
    patient: {
        id: number;
        firstName: string;
        lastName: string;
        gender: string;
        dateOfBirth: Date;
        phoneNumber: string | null;
        email: string | null;
        address: string | null;
        appointments: Array<{
            id: number;
            appointmentDateTime: Date;
            status: string;
            caseDescription: string;
        }>;
    };
    doctors: {
        id: number;
        major: string;
        userId: number;
        medicalCenterId: number;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
        };
    }[];
}

export function ClientPatientProfilePage({
    patient,
    doctors,
}: ClientPatientProfilePageProps) {
    return (
        <div className="p-6 space-y-6">
            {/* BUTTONS ROW */}
            <div className="flex justify-between items-center">
                {/* Go Back Button */}
                <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-lg h-12 px-6"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Go Back
                </Button>

                {/* Add New Appointment Button */}
                <AppointmentFormDrawer
                    patientId={patient.id}
                    doctors={doctors}
                />
            </div>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PATIENT PROFILE */}
                <Card className="md:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl">
                            {patient.firstName} {patient.lastName}
                        </CardTitle>
                        <PatientFormDrawer
                            patient={patient}
                            trigger={
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            }
                        />
                    </CardHeader>

                    <CardContent className="space-y-2 text-lg text-muted-foreground">
                        <p>
                            <strong>Gender:</strong> {patient.gender}
                        </p>
                        <p>
                            <strong>Birthdate:</strong>{" "}
                            {format(patient.dateOfBirth, "yyyy-MM-dd")}
                        </p>
                        <p>
                            <strong>Phone:</strong>{" "}
                            {patient.phoneNumber || "Not provided"}
                        </p>
                        {patient.email && (
                            <p>
                                <strong>Email:</strong> {patient.email}
                            </p>
                        )}
                        {patient.address && (
                            <p>
                                <strong>Address:</strong> {patient.address}
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* APPOINTMENTS */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-2xl">Appointments</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {patient.appointments.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No appointments yet.
                            </p>
                        )}

                        {patient.appointments.map((v) => (
                            <div
                                key={v.id}
                                className="flex items-center justify-between border rounded-lg px-4 py-3"
                            >
                                <div className="flex items-center justify-between ">
                                    <p className="font-medium text-lg">
                                        {format(v.appointmentDateTime, "PP")} •{" "}
                                        {format(v.appointmentDateTime, "EEEE")}{" "}
                                        •{" "}
                                        {format(v.appointmentDateTime, "HH:mm")}
                                    </p>
                                </div>
                                <p className="text-lg text-muted-foreground">
                                    {v.caseDescription}
                                </p>

                                <div
                                    className={`text-lg font-medium ${
                                        v.status === "confirmed"
                                            ? "text-green-600"
                                            : v.status === "completed"
                                            ? "text-blue-600"
                                            : v.status === "cancelled"
                                            ? "text-red-600"
                                            : "text-amber-600"
                                    }`}
                                >
                                    {v.status}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* FINANCIAL STATUS - Spans full width below */}
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Financial Status
                        </CardTitle>
                        <CardDescription>
                            Overview of {patient.firstName} {patient.lastName}&apos;s
                            financial information and billing
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Total Bill */}
                            <div className="space-y-2 p-4 border rounded-lg bg-muted/20">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">
                                        Total Bill
                                    </h3>
                                    <DollarSign className="h-5 w-5 text-blue-600" />
                                </div>
                                <p className="text-2xl font-bold text-blue-600">
                                    $2,850.00
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    All-time total
                                </p>
                            </div>

                            {/* Amount Due */}
                            <div className="space-y-2 p-4 border rounded-lg bg-muted/20">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">
                                        Amount Due
                                    </h3>
                                    <AlertCircle className="h-5 w-5 text-amber-600" />
                                </div>
                                <p className="text-2xl font-bold text-amber-600">
                                    $450.00
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Due in 15 days
                                </p>
                            </div>

                            {/* Last Appointment Bill */}
                            <div className="space-y-2 p-4 border rounded-lg bg-muted/20">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">
                                        Last Appointment
                                    </h3>
                                    <Calendar className="h-5 w-5 text-green-600" />
                                </div>
                                <p className="text-2xl font-bold text-green-600">
                                    $150.00
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(), "MMM dd, yyyy")}
                                </p>
                            </div>

                            {/* Payment Status */}
                            <div className="space-y-2 p-4 border rounded-lg bg-muted/20">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">
                                        Payment Status
                                    </h3>
                                    <CreditCard className="h-5 w-5 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <p className="text-lg font-medium text-green-600">
                                        Current
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Up to date
                                </p>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-lg mb-4">
                                Recent Transactions
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium">
                                            Consultation Fee
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {format(new Date(), "MMM dd, yyyy")}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-green-600">
                                            +$150.00
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Paid
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Lab Tests</p>
                                        <p className="text-sm text-muted-foreground">
                                            {format(
                                                new Date(
                                                    Date.now() -
                                                        7 * 24 * 60 * 60 * 1000
                                                ),
                                                "MMM dd, yyyy"
                                            )}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-amber-600">
                                            $300.00
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Pending
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium">
                                            Medication
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {format(
                                                new Date(
                                                    Date.now() -
                                                        14 * 24 * 60 * 60 * 1000
                                                ),
                                                "MMM dd, yyyy"
                                            )}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-green-600">
                                            +$85.00
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Paid
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Insurance Information
                        <div className="mt-6 p-4 border rounded-lg bg-blue-50">
                            <h3 className="font-semibold text-lg mb-2">
                                Insurance Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">
                                        Provider
                                    </p>
                                    <p className="font-medium">
                                        Blue Cross Blue Shield
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">
                                        Policy Number
                                    </p>
                                    <p className="font-medium">
                                        BCBS-8847-2291
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">
                                        Coverage
                                    </p>
                                    <p className="font-medium">80%</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">
                                        Deductible Used
                                    </p>
                                    <p className="font-medium">
                                        $1,200 / $2,000
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
