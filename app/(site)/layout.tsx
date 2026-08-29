import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="site-shell"><Header/><main>{children}</main><Footer/><MobileNav/></div>;
}
