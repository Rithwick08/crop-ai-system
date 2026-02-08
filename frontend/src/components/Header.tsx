import { Link, useLocation } from 'react-router-dom';
import { Sprout, Brain } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';

export function Header() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path
            ? 'text-green-600 dark:text-green-400 font-semibold'
            : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400';
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-zinc-950/80 dark:border-zinc-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="flex items-center gap-1">
                        <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-1.5">
                            <Sprout className="h-5 w-5 text-white" />
                        </div>
                        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-1.5">
                            <Brain className="h-5 w-5 text-white" />
                        </div>
                    </div>
                    <span className="font-bold text-xl hidden sm:inline-block">CropAI</span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link to="/" className={`text-sm transition-colors ${isActive('/')}`}>
                        Home
                    </Link>
                    <Link to="/estimate" className={`text-sm transition-colors ${isActive('/estimate')}`}>
                        Estimate
                    </Link>
                    <Button asChild size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all">
                        <Link to="/estimate">
                            Get Started
                        </Link>
                    </Button>
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
}
