import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const [games, categories, published, users] = await Promise.all([
    prisma.game.count(), prisma.category.count(), prisma.game.count({ where: { status: "PUBLISHED" } }), prisma.user.count()
  ]);
  return <div className="admin-shell"><aside className="admin-sidebar"><div className="admin-logo">P999<span>CMS</span></div><nav><a className="active" href="/admin">Dashboard</a><a href="/admin/games">Games</a><a href="/admin/categories">Categories</a><a href="#">Media</a><a href="#">Pages</a><a href="#">SEO</a><a href="#">Menus</a><a href="#">Users</a><a href="#">Settings</a></nav></aside><section className="admin-main"><div className="admin-top"><div><span className="eyebrow">CONTROL PANEL</span><h1>Dashboard</h1><p>Welcome back, {session.name}.</p></div><form action="/api/admin/logout" method="post"><button className="secondary-button">Logout</button></form></div><div className="admin-stats">{[["Games",games,"Total games"],["Categories",categories,"Active groups"],["Published",published,"Live games"],["Users",users,"Admin accounts"]].map(([title,value,note])=><div className="stat-card" key={String(title)}><span>{title}</span><strong>{value}</strong><small>{note}</small></div>)}</div><div className="admin-panel"><div className="panel-head"><h2>Phase 2 CMS</h2></div><p>The database layer is now connected through Prisma and Neon. Games and categories can be managed from the CMS API. The next UI iteration can add full visual editors for SEO, media, pages and homepage sections.</p><div className="admin-actions"><a className="primary-button" href="/admin/games">Manage Games</a><a className="secondary-button" href="/admin/categories">Manage Categories</a></div></div></section></div>;
}
