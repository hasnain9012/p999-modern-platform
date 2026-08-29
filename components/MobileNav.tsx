import { Headphones, Home, UserRound, UsersRound, Gift } from "lucide-react";

export function MobileNav() {
  const items = [
    ["/", "Home", Home],
    ["#", "Promo", Gift],
    ["#", "Register", UsersRound],
    ["#", "Support", Headphones],
    ["#", "Profile", UserRound],
  ] as const;

  return (
    <nav className="mobile-nav">
      {items.map(([href, label, Icon], i) => (
        <a href={href} className={i === 0 ? "active" : ""} key={label}>
          <Icon size={21} />
          {i === 2 && <span className="nav-badge">30-999</span>}
          <small>{label}</small>
        </a>
      ))}
    </nav>
  );
}