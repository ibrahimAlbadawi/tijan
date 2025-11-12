// app/receptionist/patient/[id]/page.tsx

import prisma from "@/lib/prisma";
import { ClientPatientProfilePage } from "./profile-page";

export default async function PatientProfilePage({
    params,
}: {
    params: { id: string };
}) {
    const patient = await prisma.patientProfile.findUnique({
        where: { id: Number(params.id) },
        include: {
            appointments: {
                orderBy: { appointmentDateTime: "desc" },
            },
        },
    });

    if (!patient) {
        return (
            <div className="p-6">
                <p>Patient not found.</p>
            </div>
        );
    }

    const doctors = await prisma.doctor.findMany({
        where: {
            medicalCenterId: patient.medicalCenterId,
        },
        include: {
            user: true,
        },
    });

    return (
        <ClientPatientProfilePage patient={patient} doctors={doctors} />
    );
}
