import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';

const getTitleFromPathname = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/profile':
      return 'My Profile';
    case '/community':
      return 'Community';
    default:
      return 'Dashboard';
  }
};

export function Header() {
  const location = useLocation();
  const title = getTitleFromPathname(location.pathname);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
