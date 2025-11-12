import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      appointmentDateTime,
      caseDescription,
      status,
      patientId,
      doctorId,
    } = body;

    if (!appointmentDateTime || !caseDescription || !patientId || !doctorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        appointmentDateTime: new Date(appointmentDateTime),
        caseDescription,
        status,
        patientId: Number(patientId),
        doctorId: Number(doctorId),
      },
    });

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
