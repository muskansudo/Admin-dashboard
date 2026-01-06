import connect from "@/app/lib/db";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/requireAdmin";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    requireAdmin();
    await connect();
    const products = await Product.find({});
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
