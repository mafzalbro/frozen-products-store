import React from 'react';
import Link from 'next/link';
import { footerLinks } from '@/store/footer'; // Adjust the path as necessary
import { FaHome, FaInfo, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import type { IconType } from 'react-icons'; // Import IconType
import { getMeta } from '@/store/metadata';
import { ModeToggle } from '../navbar/darkbtn';
import { Button } from '@/components/ui/button';

// Define a type for the icon map keys
type IconMapKeys = 'FaHome' | 'FaInfo' | 'FaEnvelope' | 'FaFacebook' | 'FaTwitter' | 'FaInstagram' | 'FaLinkedin';

const iconMap: Record<IconMapKeys, IconType> = {
    FaHome,
    FaInfo,
    FaEnvelope,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
};

const Footer: React.FC = () => {
    return (
        <footer className="border py-6 w-full px-6">
            <div className='flex gap-4 justify-between'>
                <h2 className='text-2xl md:text-3xl pb-4 text-center md:text-left'>{getMeta().siteTitle}</h2>
                <ModeToggle />
            </div>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex space-x-6 mb-4 md:mb-0">
                    {footerLinks.navigation.map((link, index) => {
                        const Icon = iconMap[link.icon as IconMapKeys]; // Use type assertion
                        return (
                            <Link key={index} href={link.href} passHref className="flex items-center hover:text-blue-400 transition-colors">
                                <Button variant={'outline'}>
                                    {Icon && <Icon className="mr-2" />} {link.name}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex space-x-4">
                    {footerLinks.social.map((social, index) => {
                        const Icon = iconMap[social.icon as IconMapKeys]; // Use type assertion
                        return (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={social.color}
                            >
                                <Button variant={'outline'}>
                                    {Icon && <Icon size={20} />}
                                </Button>
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="text-center mt-4">
                <p>© {new Date().getFullYear()} {getMeta().siteTitle}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
