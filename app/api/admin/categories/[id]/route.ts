import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(session.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id } = await params; const body = await request.json();
    const category = await prisma.category.update({ where: { id }, data: { name: body.name !== undefined ? String(body.name) : undefined, slug: body.slug !== undefined ? String(body.slug) : undefined, icon: body.icon !== undefined ? String(body.icon) : undefined, description: body.description !== undefined ? String(body.description) : undefined, sortOrder: body.sortOrder !== undefined ? Number(body.sortOrder) : undefined, active: body.active !== undefined ? Boolean(body.active) : undefined } });
    return NextResponse.json(category);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update category" }, { status: 500 }); }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!["SUPER_ADMIN", "ADMIN"].includes(session.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id } = await params; await prisma.category.delete({ where: { id } }); return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to delete category" }, { status: 500 }); }
}
