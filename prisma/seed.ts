import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required for seeding.");

const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

const categoryData = [
  ["Hot", "hot", "🔥", "Popular games selected for quick discovery."],
  ["Mini Games", "mini-games", "🎮", "Quick and casual mini games."],
  ["Slot", "slot", "🎰", "Browse slot-style game experiences."],
  ["Cards", "cards", "🃏", "Card games and table-style experiences."],
  ["Fishing", "fishing", "🐟", "Fishing-themed games."],
  ["Live", "live", "🎥", "Live game experiences."],
  ["Sports", "sports", "⚽", "Sports-themed games."],
  ["Demo", "demo", "🎯", "Demo and preview experiences."]
] as const;

const games = [
  ["Aviator", "aviator", "Mini Games", "aviator.svg", true],
  ["WG", "wg", "Mini Games", "wg.svg", true],
  ["INOUT", "inout", "Mini Games", "inout.svg", true],
  ["JILI", "jili", "Mini Games", "jili.svg", false],
  ["FlyX", "flyx", "Mini Games", "flyx.svg", false],
  ["Fortune Coins", "fortune-coins", "Slot", "fortune.svg", false],
  ["Crazy 777", "crazy-777", "Slot", "crazy.svg", true],
  ["Lucky Fruits", "lucky-fruits", "Slot", "lucky.svg", false],
  ["Card Master", "card-master", "Cards", "cards.svg", false],
  ["Fishing King", "fishing-king", "Fishing", "fishing.svg", false],
  ["Live Studio", "live-studio", "Live", "live.svg", false],
  ["Sports Arena", "sports-arena", "Sports", "sports.svg", false]
] as const;

async function main() {
  for (const [i, [name, slug, iconCategory, icon, description]] of categoryData.entries()) {
    await prisma.category.upsert({
      where: { slug },
      update: { name, icon, description, sortOrder: i, active: true },
      create: { name, slug, icon, description, sortOrder: i }
    });
  }

  const categoryMap = new Map((await prisma.category.findMany()).map((c) => [c.name, c.id]));

  for (const [i, [title, slug, categoryName, imageFile, hot]] of games.entries()) {
    const categoryId = categoryMap.get(categoryName);
    if (!categoryId) throw new Error(`Missing category ${categoryName}`);
    const description = `Explore ${title}, a responsive ${categoryName.toLowerCase()} experience built for quick browsing and easy access.`;
    const game = await prisma.game.upsert({
      where: { slug },
      update: {
        title,
        categoryId,
        image: `/games/${imageFile}`,
        hot,
        status: "PUBLISHED",
        sortOrder: i,
        shortDescription: description,
        description,
        features: ["Responsive interface", "Fast-loading game page", "Mobile-friendly layout", "Clear game information"]
      },
      create: {
        title,
        slug,
        categoryId,
        image: `/games/${imageFile}`,
        hot,
        status: "PUBLISHED",
        sortOrder: i,
        shortDescription: description,
        description,
        version: "1.0.0",
        size: "45 MB",
        developer: "Publisher",
        updatedLabel: "August 2026",
        features: ["Responsive interface", "Fast-loading game page", "Mobile-friendly layout", "Clear game information"]
      }
    });

    await prisma.gameSEO.upsert({
      where: { gameId: game.id },
      update: { seoTitle: `${title} — ${categoryName}`, metaDescription: description, schemaType: "VideoGame" },
      create: { gameId: game.id, seoTitle: `${title} — ${categoryName}`, metaDescription: description, schemaType: "VideoGame" }
    });
  }

  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "CHANGE_THIS";
  if (password === "CHANGE_THIS") throw new Error("Set ADMIN_PASSWORD before running db:seed.");
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: process.env.ADMIN_NAME || "Site Admin", role: "SUPER_ADMIN", active: true },
    create: { email, passwordHash, name: process.env.ADMIN_NAME || "Site Admin", role: "SUPER_ADMIN" }
  });

  console.log("Neon database seeded successfully.");
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(() => prisma.$disconnect());
