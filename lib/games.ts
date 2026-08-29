export type Game = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  hot?: boolean;
  version: string;
  size: string;
  updated: string;
  description: string;
  longDescription: string;
  features: string[];
  downloadUrl: string;
};

export type Category = { name: string; slug: string; icon: string; description: string };
