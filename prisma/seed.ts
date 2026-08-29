import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required for seeding.");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString,
  }),
});

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
  ["Sports Arena", "sports-arena", "Sports", "sports.svg", false],
] as const;

async function main() {
<<<<<<< HEAD
  // -----------------------------
  // Categories
  // -----------------------------
  for (const [
    i,
    [name, slug, icon, description],
  ] of categoryData.entries()) {
=======
  for (const [i, [name, slug, icon, description]] of categoryData.entries()) {
>>>>>>> eac873e (Fix Prisma seed and database configuration)
    await prisma.category.upsert({
      where: {
        slug,
      },
      update: {
        name,
        icon,
        description,
        sortOrder: i,
        active: true,
      },
      create: {
        name,
        slug,
        icon,
        description,
        sortOrder: i,
        active: true,
      },
    });
  }

  // -----------------------------
  // Category map
  // -----------------------------
  const categoryMap = new Map(
    (
      await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      })
    ).map((category) => [category.name, category.id])
  );

  // -----------------------------
  // Games
  // -----------------------------
  for (const [
    i,
    [title, slug, categoryName, imageFile, hot],
  ] of games.entries()) {
    const categoryId = categoryMap.get(categoryName);

    if (!categoryId) {
      throw new Error(`Missing category: ${categoryName}`);
    }

    const description = `Explore ${title}, a responsive ${categoryName.toLowerCase()} experience built for quick browsing and easy access.`;

    const game = await prisma.game.upsert({
      where: {
        slug,
      },

      update: {
        title,
        categoryId,
        image: `/games/${imageFile}`,
        hot,
        status: "PUBLISHED",
        sortOrder: i,
        shortDescription: description,
        description,
        features: [
          "Responsive interface",
          "Fast-loading game page",
          "Mobile-friendly layout",
          "Clear game information",
        ],
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
        features: [
          "Responsive interface",
          "Fast-loading game page",
          "Mobile-friendly layout",
          "Clear game information",
        ],
      },
    });

    // -----------------------------
    // Game SEO
    // -----------------------------
    await prisma.gameSEO.upsert({
      where: {
        gameId: game.id,
      },

      update: {
        seoTitle: `${title} — ${categoryName}`,
        metaDescription: description,
        schemaType: "VideoGame",
      },

      create: {
        gameId: game.id,
        seoTitle: `${title} — ${categoryName}`,
        metaDescription: description,
        schemaType: "VideoGame",
      },
    });
  }

  // -----------------------------
  // Admin User
  // -----------------------------
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "CHANGE_THIS";
  const name = process.env.ADMIN_NAME || "Site Admin";

  if (password === "CHANGE_THIS") {
    throw new Error("Set ADMIN_PASSWORD before running db:seed.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: {
      email,
    },

    update: {
      passwordHash,
      name,
      role: "SUPER_ADMIN",
      active: true,
    },

    create: {
      email,
      passwordHash,
      name,
      role: "SUPER_ADMIN",
      active: true,
    },
  });

  console.log("=================================");
  console.log("Neon database seeded successfully.");
  console.log(`Categories: ${categoryData.length}`);
  console.log(`Games: ${games.length}`);
  console.log(`Admin: ${email}`);
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
