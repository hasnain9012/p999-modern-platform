import { getPublishedGames } from "@/lib/game-db";
import { GameCard } from "@/components/GameCard";
export const dynamic = "force-dynamic";
export const metadata = { title: "All Games", description: "Browse all games available on the platform." };
export default async function GamesPage(){const dbGames=await getPublishedGames();const games=dbGames.map(g=>({title:g.title,slug:g.slug,category:g.category.name,image:g.image,hot:g.hot,version:g.version,size:g.size,updated:g.updatedLabel,description:g.shortDescription,longDescription:g.description,features:Array.isArray(g.features)?g.features as string[]:[],downloadUrl:g.downloadUrl}));return <div className="container page-space"><div className="page-heading"><div><span className="eyebrow">GAME LIBRARY</span><h1>All Games</h1><p>Browse the complete game collection by category.</p></div></div><div className="game-grid game-grid-wide">{games.map(game=><GameCard key={game.slug} game={game}/>)}</div></div>}
