
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(patients)
}

export async function POST(request: NextRequest) {
  try {
    const { fullName, email } = await request.json()

    const patient = await prisma.patient.create({
      data: {
        fullName,
        email,
      },
    })

    return NextResponse.json(patient)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    )
  }
}