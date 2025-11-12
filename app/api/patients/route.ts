import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const patients = await prisma.patientProfile.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        return NextResponse.json(
            { error: "Failed to fetch patients" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.firstName || !body.lastName || !body.dateOfBirth) {
            return NextResponse.json(
                { error: "First name, last name, and date of birth are required" },
                { status: 400 }
            );
        }

        const patient = await prisma.patientProfile.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email || null,
                dateOfBirth: new Date(body.dateOfBirth),
                phoneNumber: body.phoneNumber || null,
                gender: body.gender || "prefer_not_to_say",
                nationality: body.nationality || null,
                address: body.address || null,
                medicalCenterId: body.medicalCenterId || 1, // Default fallback
            },
        });

        return NextResponse.json(patient);
    } catch (error) {
        console.error("Error creating patient:", error);
        return NextResponse.json(
            { error: "Failed to create patient" },
            { status: 500 }
        );
    }
}