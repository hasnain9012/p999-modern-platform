import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAdmin();
    const games = await prisma.game.findMany({ include: { category: true, seo: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error && error.message === "UNAUTHORIZED" ? "Unauthorized" : "Failed to load games" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(session.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await request.json();
    const title = String(body.title || "").trim();
    const slug = String(body.slug || "").trim();
    const categoryId = String(body.categoryId || "");
    if (!title || !slug || !categoryId) return NextResponse.json({ error: "Title, slug and category are required." }, { status: 400 });

    const game = await prisma.game.create({
      data: {
        title, slug, categoryId,
        shortDescription: String(body.shortDescription || ""),
        description: String(body.description || ""),
        image: String(body.image || "/games/aviator.svg"),
        downloadUrl: String(body.downloadUrl || "#download"),
        version: String(body.version || "1.0.0"),
        size: String(body.size || "Unknown"),
        developer: String(body.developer || "Publisher"),
        hot: Boolean(body.hot),
        featured: Boolean(body.featured),
        status: body.status === "DRAFT" ? "DRAFT" : "PUBLISHED",
        features: Array.isArray(body.features) ? body.features : [],
        seo: { create: { seoTitle: body.seoTitle ? String(body.seoTitle) : undefined, metaDescription: body.metaDescription ? String(body.metaDescription) : undefined, canonicalUrl: body.canonicalUrl ? String(body.canonicalUrl) : undefined, focusKeyword: body.focusKeyword ? String(body.focusKeyword) : undefined, schemaType: "VideoGame" } }
      },
      include: { category: true, seo: true }
    });
    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create game" }, { status: 500 });
  }
}
