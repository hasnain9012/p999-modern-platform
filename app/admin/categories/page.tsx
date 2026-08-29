import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const session = await getAdminSession(); if (!session) redirect("/admin/login");
  const categories = await prisma.category.findMany({ include: {_count:{select:{games:true}}}, orderBy:{sortOrder:"asc"} });
  return <div className="admin-shell"><aside className="admin-sidebar"><div className="admin-logo">P999<span>CMS</span></div><nav><a href="/admin">Dashboard</a><a href="/admin/games">Games</a><a className="active" href="/admin/categories">Categories</a></nav></aside><section className="admin-main"><div className="admin-top"><div><span className="eyebrow">CONTENT</span><h1>Categories</h1><p>{categories.length} categories are configured.</p></div></div><div className="admin-panel admin-table"><div className="admin-row admin-row-head"><span>Category</span><span>Slug</span><span>Games</span><span>Status</span></div>{categories.map(c=><div className="admin-row" key={c.id}><div><strong>{c.icon} {c.name}</strong><small>{c.description}</small></div><span>{c.slug}</span><span>{c._count.games}</span><span className="status">{c.active?"Active":"Hidden"}</span></div>)}</div></section></div>;
}
