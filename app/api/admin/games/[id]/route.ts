import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(session.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id } = await params;
    const body = await request.json();
    const data: Record<string, unknown> = {};
    const fields = ["title", "slug", "shortDescription", "description", "image", "downloadUrl", "version", "size", "developer", "updatedLabel", "categoryId", "status"] as const;
    for (const field of fields) if (body[field] !== undefined) data[field] = String(body[field]);
    for (const field of ["hot", "featured"] as const) if (body[field] !== undefined) data[field] = Boolean(body[field]);
    if (body.features !== undefined) data.features = Array.isArray(body.features) ? body.features : [];
    const game = await prisma.game.update({ where: { id }, data, include: { category: true, seo: true } });
    if (body.seo) {
      await prisma.gameSEO.upsert({ where: { gameId: id }, update: body.seo, create: { gameId: id, ...body.seo } });
    }
    return NextResponse.json(game);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update game" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!["SUPER_ADMIN", "ADMIN"].includes(session.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id } = await params;
    await prisma.game.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to delete game" }, { status: 500 });
  }
}
