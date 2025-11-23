import Link from "next/link";
import { Home, BarChart2, Settings, Leaf, Flower } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useDhuhaStore } from "@/lib/store";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    useDhuhaStore.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row max-w-7xl mx-auto md:border-x-2 md:border-black">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r-2 border-black bg-white sticky top-0 h-screen p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-3 bg-primary border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Flower className="text-black" size={24} />
          </div>
          <h1 className="text-2xl font-black text-black font-serif tracking-tight">Barakah Quest</h1>
        </div>
        
        <nav className="space-y-4 flex-1">
          <SidebarLink href="/dashboard" icon={Home} label="My Garden" active={pathname === "/dashboard"} />
          <SidebarLink href="/stats" icon={BarChart2} label="Statistics" active={pathname === "/stats"} />
          <SidebarLink href="/settings" icon={Settings} label="Settings" active={pathname === "/settings"} />
        </nav>
        
        <div className="text-xs text-muted-foreground px-4">
          <p>© 2025 Barokah Quest</p>
        </div>
      </aside>

      {/* Mobile Header */}
      {/* <header className="md:hidden p-4 flex items-center justify-center border-b-2 border-black bg-white sticky top-0 z-10">
        <h1 className="text-xl font-black text-black font-serif tracking-tight">Barakah Quest</h1>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col md:p-10 md:overflow-y-auto bg-background">
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden p-4 bg-white border-t-2 border-black flex justify-around items-center sticky bottom-0 z-10">
        <NavLink href="/dashboard" icon={Home} label="Garden" active={pathname === "/dashboard"} />
        <NavLink href="/stats" icon={BarChart2} label="Stats" active={pathname === "/stats"} />
        <NavLink href="/settings" icon={Settings} label="Settings" active={pathname === "/settings"} />
      </nav>
    </div>
  );
}

function NavLink({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
        active ? "text-black bg-accent border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "text-muted-foreground hover:text-black"
      )}
    >
      <Icon size={20} strokeWidth={2.5} />
      <span className="text-xs font-bold">{label}</span>
    </Link>
  );
}

function SidebarLink({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all border-2 border-transparent",
        active 
          ? "bg-accent text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]" 
          : "text-muted-foreground hover:bg-muted hover:text-black hover:border-black"
      )}
    >
      <Icon size={20} strokeWidth={2.5} />
      <span>{label}</span>
    </Link>
  );
}
