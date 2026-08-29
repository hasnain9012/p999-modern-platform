import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(await prisma.category.findMany({ include: { _count: { select: { games: true } } }, orderBy: { sortOrder: "asc" } }));
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(session.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await request.json();
    const category = await prisma.category.create({ data: { name: String(body.name || ""), slug: String(body.slug || ""), icon: String(body.icon || "🎮"), description: String(body.description || ""), sortOrder: Number(body.sortOrder || 0) } });
    return NextResponse.json(category, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create category" }, { status: 500 }); }
}
