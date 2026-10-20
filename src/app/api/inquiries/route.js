import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDir, "inquiries.json");

// Helper to ensure file exists and read data
function getInquiries() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
      return [];
    }
    const content = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(content || "[]");
  } catch (error) {
    console.error("Error reading inquiries:", error);
    return [];
  }
}

// Helper to save inquiries
function saveInquiries(inquiries) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(inquiries, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving inquiries:", error);
    return false;
  }
}

// GET: Fetch all inquiries
export async function GET() {
  const inquiries = getInquiries();
  return NextResponse.json({ success: true, inquiries });
}

// POST: Save a new booking inquiry
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, serviceType, eventDate, eventLocation, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone are required." },
        { status: 400 }
      );
    }

    const newInquiry = {
      id: "inq-" + Date.now(),
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : "",
      serviceType: serviceType || "Bridal",
      eventDate: eventDate || "",
      eventLocation: eventLocation ? String(eventLocation).trim() : "",
      message: message ? String(message).trim() : "",
      createdAt: new Date().toISOString()
    };

    const inquiries = getInquiries();
    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    console.error("Error processing inquiry POST:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove an inquiry
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Inquiry ID is required" },
        { status: 400 }
      );
    }

    let inquiries = getInquiries();
    inquiries = inquiries.filter((inq) => inq.id !== id);
    saveInquiries(inquiries);

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
