import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("PUT request received for patient ID:", params.id);
    
    const body = await request.json();
    console.log("Request body:", body);

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.dateOfBirth) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "First name, last name, and date of birth are required" },
        { status: 400 }
      );
    }

    // Convert string ID to number
    const patientId = parseInt(params.id);

    const patient = await prisma.patientProfile.update({
      where: { id: patientId  },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        dateOfBirth: new Date(body.dateOfBirth),
        phoneNumber: body.phoneNumber,
        gender: body.gender,
        nationality: body.nationality,
        address: body.address,
        medicalCenterId: body.medicalCenterId,
      },
    });

    console.log("Patient updated successfully:", patient);
    return NextResponse.json(patient);
    
  } catch (error) {
    console.error("Error updating patient:", error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}