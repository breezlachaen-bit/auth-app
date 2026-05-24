
import      { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
export async function POST(request: Request) {
    const body = await request.json();

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        },
    });
    if (!user) {
        return NextResponse.json({  
            success: false,  
            message: "email or password is invalid",
        },
        {
            status: 200,
        });
    }
    return NextResponse.json({
        success: true,
        message: "login successful",
        token: "fake-jwt-token",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
}