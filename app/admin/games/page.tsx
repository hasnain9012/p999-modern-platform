import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GameManager } from "@/components/admin/GameManager";

export const dynamic = "force-dynamic";

export default async function AdminGamesPage() {
  const session = await getAdminSession(); if (!session) redirect("/admin/login");
  const [games, categories] = await Promise.all([prisma.game.findMany({ include: { category: true, seo: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }), prisma.category.findMany({ orderBy: { sortOrder: "asc" } })]);
  return <div className="admin-shell"><aside className="admin-sidebar"><div className="admin-logo">P999<span>CMS</span></div><nav><a href="/admin">Dashboard</a><a className="active" href="/admin/games">Games</a><a href="/admin/categories">Categories</a><a href="#">Media</a><a href="#">Pages</a><a href="#">SEO</a></nav></aside><section className="admin-main"><GameManager initialGames={games} categories={categories} /></section></div>;
}
