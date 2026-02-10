import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sprout, Brain, LogIn, LogOut, User, Settings, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Header() {
    const location = useLocation();
    const { user, logout, changeUsername } = useAuth();
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { t } = useTranslation();

    const isActive = (path: string) => {
        return location.pathname === path
            ? 'text-green-600 dark:text-green-400 font-semibold'
            : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400';
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleUsernameChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (newUsername.trim()) {
            changeUsername(newUsername.trim());
            setIsDialogOpen(false);
            setNewUsername('');
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-zinc-950/80 dark:border-zinc-800">
            <div className="w-full px-6 h-16 flex items-center justify-between">
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
                        {t('header.home')}
                    </Link>
                    <Link to="/schemes" className={`text-sm transition-colors ${isActive('/schemes')}`}>
                        {t('schemes.menu', 'Schemes')}
                    </Link>
                    {user && (
                        <>
                            <Link to="/estimate" className={`text-sm transition-colors ${isActive('/estimate')}`}>
                                {t('header.estimate')}
                            </Link>
                            <Link to="/analytics" className={`text-sm transition-colors ${isActive('/analytics')}`}>
                                {t('header.analytics')}
                            </Link>
                        </>
                    )}

                    {/* Get Started Button - Visible Always */}
                    <Button asChild size="sm" className={`bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all ${user ? 'mr-2' : ''}`}>
                        <Link to="/estimate">
                            {t('header.getStarted')}
                        </Link>
                    </Button>

                    {user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <span className="font-medium text-sm hidden sm:inline-block">{t('header.welcome', { name: user.name })}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
                                        <Edit className="mr-2 h-4 w-4" />
                                        <span>{t('header.changeUsername')}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>{t('header.logout')}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button asChild size="sm" variant="ghost">
                                <Link to="/login" className="flex items-center gap-2">
                                    <LogIn className="h-4 w-4" />
                                    <span>{t('header.login')}</span>
                                </Link>
                            </Button>
                        </div>
                    )}

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t('header.editProfile')}</DialogTitle>
                                <DialogDescription>
                                    {t('header.editProfileDesc')}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUsernameChange}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            {t('header.username')}
                                        </Label>
                                        <Input
                                            id="username"
                                            defaultValue={user?.name || ''}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">{t('header.saveChanges')}</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <LanguageSwitcher />
                    <ModeToggle />
                </nav>
            </div>
        </header >
    );
}
