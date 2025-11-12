import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    // Await the params first
    const { id } = await context.params;
    
    console.log("PUT request received for patient ID:", id);
    
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
    const patientId = parseInt(id);
    
    // Check if the conversion resulted in a valid number
    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    const patient = await prisma.patientProfile.update({
      where: { id: patientId },
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

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    // Await the params first
    const { id } = await context.params;
    
    const patientId = parseInt(id);
    
    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    const patient = await prisma.patientProfile.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    // Await the params first
    const { id } = await context.params;
    
    const patientId = parseInt(id);
    
    if (isNaN(patientId)) {
      return NextResponse.json(
        { error: "Invalid patient ID" },
        { status: 400 }
      );
    }

    await prisma.patientProfile.delete({
      where: { id: patientId },
    });

    return NextResponse.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}