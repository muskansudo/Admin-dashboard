import { NextResponse } from "next/server";
import connect from "@/app/lib/db";
import Product from "@/app/models/Product";
import cloudinary from "@/app/lib/cloudinary";
import { requireAdmin } from "@/app/lib/requireAdmin";
import { productSchema } from "@/app/lib/validators/product";

export async function GET(req: Request) {
  try {
    requireAdmin();
    await connect();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    const query: any = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
    const total = await Product.countDocuments(query);

    return NextResponse.json({
      products,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    requireAdmin();
    await connect();

    const body = await req.json();

    const validated = productSchema.parse(body);

    let imageUrl = "";
    if (validated.image) {
      const upload = await cloudinary.uploader.upload(validated.image, {
        folder: "products",
      });
      imageUrl = upload.secure_url;
    }

    const product = await Product.create({
      ...validated,
      image: imageUrl,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json(
        { errors: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  try {
    requireAdmin();
    await connect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const body = await req.json();

    const validated = productSchema.partial().parse(body);

    let imageUrl: string | undefined;
    if (validated.image) {
      const upload = await cloudinary.uploader.upload(validated.image, {
        folder: "products",
      });
      imageUrl = upload.secure_url;
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        ...validated,
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json(
        { errors: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req: Request) {
  try {
    requireAdmin();
    await connect();

    const { id } = await req.json();
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
