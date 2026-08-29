import type { Game } from "@/lib/games";
import { Star } from "lucide-react";
export function GameCard({ game }: { game: Game }) { return <a className="game-card" href={`/games/${game.slug}`}><div className="game-image" style={{backgroundImage:`url(${game.image})`}}>{game.hot&&<span className="hot-badge">HOT</span>}<span className="favorite"><Star size={14} fill="currentColor"/></span></div><div className="game-info"><strong>{game.title}</strong><small>{game.category}</small></div></a>; }
