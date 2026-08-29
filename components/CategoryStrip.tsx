import type { Category } from "@/lib/games";
export function CategoryStrip({ categories }: { categories: Category[] }) { return <div className="container"><div className="category-strip">{categories.map(category=><a href={`/category/${category.slug}`} key={category.slug} className="category-item"><span>{category.icon}</span><small>{category.name}</small></a>)}</div></div>; }
