import { Hero } from "@/components/Hero";
import { CategoryStrip } from "@/components/CategoryStrip";
import { GameSection } from "@/components/GameSection";
import { getCategories, getPublishedGames } from "@/lib/game-db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [dbGames, categories] = await Promise.all([getPublishedGames(), getCategories()]);
  const games = dbGames.map((g) => ({ id:g.id,title:g.title,slug:g.slug,category:g.category.name,image:g.image,hot:g.hot,version:g.version,size:g.size,updated:g.updatedLabel,description:g.shortDescription,longDescription:g.description,features:Array.isArray(g.features)?g.features as string[]:[],downloadUrl:g.downloadUrl }));
  const hot = games.filter(g => g.hot).slice(0,6);
  const mini = games.filter(g => g.category === "Mini Games").slice(0,6);
  const slot = games.filter(g => g.category === "Slot").slice(0,6);
  return <><Hero/><CategoryStrip categories={categories}/><div className="container home-content"><GameSection title="Hot" icon="🔥" games={hot}/><GameSection title="Mini Games" icon="🎮" games={mini}/><GameSection title="Slot" icon="🎰" games={slot}/></div></>;
}
