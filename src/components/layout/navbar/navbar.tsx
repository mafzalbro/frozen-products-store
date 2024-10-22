'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    // NavigationMenuLink,
    //   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';
import { MdClose } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { ModeToggle } from './darkbtn';

const Navbar = ({ user, token }: { user: { username: string }, token: string }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn] = useState(!!token);
    const [profile] = useState(user);
    const router = useRouter();
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // setIsLoggedIn(false);
        router.push('/logout');
    };

    interface Meta {
        siteTitle: string
    }

    const metadata: Meta = {
        siteTitle: 'Frozen Flix'
    }

    // Define the navigation links
    const navLinks = [
        { href: '/categories', label: 'Categories' },
        { href: '/products', label: 'Products' },
        { href: '/search', label: 'Search' },
        { href: '/cart', label: 'Cart', icon: <FaShoppingCart /> },
        {
            href: isLoggedIn ? undefined : '/login',
            label: isLoggedIn ? 'Logout' : 'Login',
            onClick: isLoggedIn ? handleLogout : undefined,
            icon: <FaUser />,
        },
        {
            href: isLoggedIn ? undefined : '/signup',
            label: isLoggedIn ? null : 'SignUp',
            onClick: isLoggedIn ? handleLogout : undefined,
            icon: <FaUser />,
        },
        // { href: '/signup', label: 'SignUp', icon: <FaUser /> },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <NavigationMenu>
                <NavigationMenuList className="w-screen p-4 flex justify-between items-center bg-primary-foreground text-secondary-foreground">
                    <Link href={'/'}>
                        <h1 className="text-2xl font-bold">{metadata.siteTitle}</h1>
                    </Link>
                    <Button variant={'ghost'} className="sm:hidden" onClick={toggleMenu}>
                        <RiMenu4Line />
                    </Button>
                    <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className='hidden sm:flex justify-center items-center sm:gap-4 md:gap-8 lg:gap-10'>
                        {navLinks.map((link, index) => (
                            link.label && <NavigationMenuItem key={index}>
                                {link.href ? (
                                    <Link href={link.href} className={`hover:text-gray-600 dark:hover:text-gray-400 flex items-center ${pathname.includes(link.href) ? 'text-blue-600 dark:text-blue-300' : ''}`}>
                                        {link.icon && <span className="mr-1">{link.icon}</span>}
                                        {link.label}
                                    </Link>
                                ) : (
                                    <Button variant={'ghost'} onClick={link.onClick} className="hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                                        {link.icon && <span className="mr-1">{link.icon}</span>}
                                        {link.label}
                                    </Button>
                                )}
                            </NavigationMenuItem>
                        ))}

                        <ModeToggle />
                    </motion.div>
                </NavigationMenuList>

                {/* Mobile Menu (optional) */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="sm:hidden fixed top-0 left-0 h-screen w-2/3 bg-primary-foreground dark:bg-secondary p-4 shadow-lg z-50 pt-10"
                            initial={{ opacity: 0, x: '-100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '-200%' }}
                            transition={{ type: "spring", stiffness: 100 }}                       >
                            <Button variant={'ghost'} className="mb-4 absolute right-4 top-4 z-10" onClick={toggleMenu}>
                                <MdClose />
                            </Button>
                            <ul className="flex flex-col space-y-8 text-center">
                                <motion.li initial={{ y: -10 }}
                                    animate={{ y: 0 }}
                                >
                                    Hey, <span className='font-semibold'>{profile?.username}</span>
                                </motion.li>

                                {navLinks.map((link, index) => (
                                    link.label && <motion.li key={index}
                                        initial={{ y: -10 }}
                                        animate={{ y: 0 }}
                                    >
                                        {link.href ? (
                                            <Link href={link.href} className={`hover:text-gray-600 dark:hover:text-gray-400 ${pathname.includes(link.href) ? 'text-blue-600 dark:text-blue-300 ' : ''}`}>
                                                {link.icon && <span className="mr-1 inline-block">{link.icon}</span>}
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <Button variant={'ghost'} onClick={link.onClick} className="hover:text-gray-600 dark:hover:text-gray-400">
                                                {link.icon && <span className="mr-1 inline-block">{link.icon}</span>}
                                                {link.label}
                                            </Button>
                                        )}
                                    </motion.li>
                                ))}
                                <motion.li initial={{ y: -10 }}
                                    animate={{ y: 0 }}
                                >
                                    <ModeToggle />
                                </motion.li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </NavigationMenu>
        </motion.div >
    );
};

export default Navbar;
