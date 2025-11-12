import { NextResponse } from "next/server";
import { login } from "@/modules/auth/application/login.usecase";

export async function POST(req: Request) {
    const { identifier, password } = await req.json();

    try {
        const { token, user } = await login(identifier, password);

        return NextResponse.json({
            token,
            role: user.role,
            name: `${user.firstName} ${user.lastName}`, // or just user.firstName if you prefer
            medicalCenter: user.medicalCenter // Add this line
        });
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 401 }
        );
    }
}