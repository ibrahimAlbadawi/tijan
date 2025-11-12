import prisma from "@/lib/prisma";
import PatientsList from "@/components/ui/patients-list";

export default async function PatientsPage() {
    const patients = await prisma.patientProfile.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="p-6">
            {patients.length === 0 ? (
                <p className="text-muted-foreground">No patients yet.</p>
            ) : (
                <PatientsList patients={patients} />
            )}
        </div>
    );
}
