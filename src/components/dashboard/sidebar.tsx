import {
  LayoutDashboard,
  Server,
  ShoppingBag,
  BarChart3,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Laptop,
  Map,
  Trophy,
  Briefcase,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';

type SidebarProps = {
  currentPage: string;
  setCurrentPage: (page: any) => void;
};

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const { setTheme } = useTheme();

  const menuItems = [
    { id: 'overview', label: 'Network Overview', icon: LayoutDashboard },
    { id: 'nodes', label: 'My Nodes', icon: Server },
    { id: 'node-map', label: 'Node Map', icon: Map },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'inventivenet', label: 'InventiveNet', icon: Calculator },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="w-64 border-r bg-card px-3 py-4 flex flex-col">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold">GPU Network</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentPage(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      <div className="mt-auto pt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="ml-2">Theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <Laptop className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}