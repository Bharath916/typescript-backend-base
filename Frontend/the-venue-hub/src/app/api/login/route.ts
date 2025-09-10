import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Call your backend login API
    const backendResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, // Replace with your backend login API
      { email, password }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Login successful",
      data: backendResponse.data,
    });
  } catch (error: any) {
    console.error("Error in login:", error?.response?.data || error.message);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message ||
          "Invalid credentials or server error",
      },
      { status: error?.response?.status || 500 }
    );
  }
}
