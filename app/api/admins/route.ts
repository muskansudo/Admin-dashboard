import { NextResponse } from "next/server";
import connect from "@/app/lib/db";
import Admin from "@/app/models/Admin";
import { requireAdmin } from "@/app/lib/requireAdmin";
import bcrypt from "bcryptjs";

/* -------- GET: List admins -------- */
export async function GET() {
  try {
    requireAdmin();
    await connect();

    const admins = await Admin.find({}, { password: 0 }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ admins });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

/* -------- POST: Create admin -------- */
export async function POST(req: Request) {
  try {
    requireAdmin();
    await connect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await Admin.create({ email, password: hashed });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
