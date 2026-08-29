import type { Game } from "@/lib/games";
import { GameCard } from "./GameCard";
export function GameSection({title,icon,games}:{title:string;icon:string;games:Game[]}){return <section className="game-section"><div className="section-title"><h2><span>{icon}</span>{title}</h2><a href={`/category/${title.toLowerCase().replaceAll(" ","-")}`}>‹ <span>All</span> ›</a></div><div className="game-grid">{games.map(game=><GameCard game={game} key={game.slug}/>)}</div></section>}
