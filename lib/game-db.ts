import { prisma } from "@/lib/prisma";

export async function getPublishedGames() {
  return prisma.game.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true, seo: true },
    orderBy: [{ featured: "desc" }, { hot: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }]
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" }
  });
}

export async function getGameBySlug(slug: string) {
  return prisma.game.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { category: true, seo: true }
  });
}

export async function getGamesByCategory(slug: string) {
  return prisma.game.findMany({
    where: { status: "PUBLISHED", category: { slug, active: true } },
    include: { category: true, seo: true },
    orderBy: [{ hot: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }]
  });
}
