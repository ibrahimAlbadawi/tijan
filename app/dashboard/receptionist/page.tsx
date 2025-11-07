import { redirect } from "next/navigation"

export default function ReceptionistDashboardRoot() {
  redirect("/dashboard/receptionist/patients")
}