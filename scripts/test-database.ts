import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  const [categories, games, users] = await Promise.all([
    prisma.category.count(),
    prisma.game.count(),
    prisma.user.count()
  ]);
  console.log(JSON.stringify({ connected: true, categories, games, users }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(() => prisma.$disconnect());
