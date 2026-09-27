export type NavItem = {
  label: string;
  href: string;
  emoji: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/", emoji: "⚡" },
  { label: "About Tesla", href: "/about", emoji: "👦" },
  { label: "Favorites", href: "/favorites", emoji: "❤️" },
  { label: "Adventures", href: "/adventures", emoji: "🌍" },
  { label: "Gallery", href: "/gallery", emoji: "📸" },
  { label: "Dreams", href: "/dreams", emoji: "🚀" },
  { label: "Nikola Tesla", href: "/nikola-tesla", emoji: "🔬" },
  { label: "Fun Zone", href: "/fun-zone", emoji: "🎮" },
];
