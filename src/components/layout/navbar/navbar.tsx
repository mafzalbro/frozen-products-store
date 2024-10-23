'use client';

import { useEffect, useState } from 'react';
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
import { getMeta } from '@/store/metadata';
import { SearchIcon } from 'lucide-react';
import { useCart } from '@/hooks/cart-context';
import { Badge } from '@/components/ui/badge';

const Navbar = ({ user, token }: { user: { username: string }, token: string }) => {
    const { cartItemsCount } = useCart()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [profile, setProfile] = useState(user);
    const router = useRouter();
    const pathname = usePathname();
    const metadata = getMeta()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        router.push('/logout');
    };

    useEffect(() => {
        setIsLoggedIn(!!token);
        setProfile(user);
    }, [token, user]);

    useEffect(() => {
        document.body.onclick = (e) => {
            const sidebar = document.getElementById('sidebar')
            const menuButton = document.getElementById('menu-button')
            const target = e.target as Node
            if (!sidebar?.contains(target) && !menuButton?.contains(target)) {
                setIsMenuOpen(false)
            }
        }
    }, []);


    // Define the navigation links
    const navLinks = [
        { href: '/categories', label: 'Categories' },
        { href: '/products', label: 'Products' },
        { href: '/orders', label: 'Orders' },
        {
            href: isLoggedIn ? undefined : '/login',
            label: isLoggedIn ? 'Logout' : 'Login',
            onClick: isLoggedIn ? handleLogout : undefined,
            icon: <FaUser />,
        },
        // {
        //     href: isLoggedIn ? undefined : '/signup',
        //     label: isLoggedIn ? null : 'SignUp',
        //     onClick: isLoggedIn ? handleLogout : undefined,
        //     icon: <FaUser />,
        // },
        { href: '/search', label: null, icon: <SearchIcon size={15} /> },
        {
            href: '/cart', label: null, icon: null
        },
        // { href: '/signup', label: 'SignUp', icon: <FaUser /> },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className='relative z-50'
        >
            <NavigationMenu>
                <NavigationMenuList className="w-screen p-4 flex justify-between items-center bg-primary-foreground text-secondary-foreground">
                    <Link href={'/'}>
                        <motion.h1 transition={{ duration: 0.2 }} className="text-lg md:text-2xl font-bold ml-2 md:ml-3">{metadata.siteTitle}</motion.h1>
                    </Link>
                    <div className='flex justify-center items-center'>
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className='hidden lg:flex justify-center items-center sm:gap-4 md:gap-5 lg:gap-6'>
                            {navLinks.map((link, index) => (
                                link.label && <NavigationMenuItem key={index}>
                                    {link.href ? (
                                        <Link href={link.href} className={`hover:text-gray-600 dark:hover:text-gray-400 flex items-center ${pathname.includes(link.href) ? 'text-blue-600 dark:text-blue-300' : ''}`}>
                                            {link.icon && <span className="mr-2">{link.icon}</span>}
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <Button variant={'ghost'} onClick={link.onClick} className="hover:text-gray-600 dark:hover:text-gray-400 flex items-center">
                                            {link.icon && <span className="mr-2">{link.icon}</span>}
                                            {link.label}
                                        </Button>
                                    )}
                                </NavigationMenuItem>
                            ))}

                        </motion.div>
                        <div>
                            <Link href={'/cart'}>
                                <Button variant={'ghost'} id='menu-button'>
                                    <span className="relative inline-flex items-center">
                                        <FaShoppingCart className="mr-2 dark:text-white inline-block" size={0} />
                                        {cartItemsCount > 0 && (
                                            <Badge variant={'destructive'} className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold">
                                                {cartItemsCount}
                                            </Badge>
                                        )}
                                    </span>
                                </Button>
                            </Link>
                            <Button variant={'ghost'} className="lg:hidden" id='menu-button' onClick={toggleMenu}>
                                <RiMenu4Line />
                            </Button>
                        </div>
                    </div>
                </NavigationMenuList>

                {/* Mobile Menu (optional) */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            id='sidebar'
                            className="lg:hidden fixed top-0 left-0 h-screen w-2/3 bg-white dark:bg-gray-900 p-4 shadow-lg z-50 pt-10 bg-opacity-95 backdrop-blur-sm dark:bg-opacity-95 dark:backdrop-blur-sm"
                            initial={{ opacity: 0, x: '-100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '-200%' }}
                            transition={{ type: "spring", stiffness: 100 }}                       >
                            <Button variant={'ghost'} className="mb-4 absolute right-4 top-4 z-50" onClick={toggleMenu}>
                                <MdClose />
                            </Button>
                            <ul className="flex flex-col space-y-8 text-center">
                                {profile && <motion.li initial={{ y: -10 }}
                                    animate={{ y: 0 }}
                                >
                                    Hey, <span className='font-semibold'>{profile?.username}</span>
                                </motion.li>}

                                {navLinks.map((link, index) => (
                                    link.label && <motion.li key={index}
                                        initial={{ y: -10 }}
                                        animate={{ y: 0 }}
                                    >
                                        {link.href ? (
                                            <Link href={link.href} className={`hover:text-gray-600 dark:hover:text-gray-400 ${pathname.includes(link.href) ? 'text-blue-600 dark:text-blue-300 ' : ''}`}>
                                                {link.icon && <span className="mr-2 inline-block">{link.icon}</span>}
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <Button variant={'ghost'} onClick={link.onClick} className="hover:text-gray-600 dark:hover:text-gray-400">
                                                {link.icon && <span className="mr-2 inline-block">{link.icon}</span>}
                                                {link.label}
                                            </Button>
                                        )}
                                    </motion.li>
                                ))}
                                {/* <motion.li initial={{ y: -10 }}
                                    animate={{ y: 0 }}
                                >
                                    
                                </motion.li> */}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </NavigationMenu>
        </motion.div >
    );
};

export default Navbar;
