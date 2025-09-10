import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // const { email, password } = body;

    // Simulate saving to database
    // console.log("Received Registration Data:", email, password);

    // You can connect to DB here and store user

    // Call your backend server with IP or domain
    const backendResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/create`, // Change to your server domain/IP
      body
    );

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
