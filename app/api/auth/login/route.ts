import { NextResponse } from "next/server";
import { login } from "@/modules/auth/application/login.usecase";

export async function POST(req: Request) {
    const { identifier, password } = await req.json();

    try {
        const { token, user } = await login(identifier, password);

        return NextResponse.json({
            token,
            role: user.role,
            name: user.name,
        });
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 401 }
        );
    }
}
