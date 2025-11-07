import prisma from "@/lib/prisma"
import { PatientFormDrawer } from "@/components/ui/patient-form-drawer"

export default async function PatientsPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <PatientFormDrawer />
      </div>

      <div className="flex flex-col gap-3">
        {patients.length === 0 && (
          <p className="text-muted-foreground">No patients yet.</p>
        )}

        {patients.map((p) => (
          <div key={p.id} className="border p-4 rounded-xl">
            <div className="text-2xl">{p.fullName}</div>
            <div className="text-sm text-muted-foreground">{p.email}</div>
          </div>
        ))}
      </div>
    </div>
  )
}