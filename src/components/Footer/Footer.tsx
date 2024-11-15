import React from 'react';
import kainosLogo from '../../assets/Kainos-alt-transparent.png';

const Footer = () => {
    const footerLinks = {
        productLinks: [
            { title: 'Spark', href: '#' },
            { title: 'Team', href: '#' },
            { title: 'Research', href: '#' },
            { title: 'Kainos', href: '#' },
            { title: 'Customers', href: '#' },
            { title: 'News', href: '#' },
            { title: 'Careers', href: '#' },
        ],
        supportLinks: [
            { title: 'Press Inquiries', href: '#' },
            { title: 'Support', href: '#' },
            { title: 'Status', href: '#' },
            { title: 'Availability', href: '#' },
            { title: 'Twitter', href: '#' },
            { title: 'LinkedIn', href: '#' },
            { title: 'YouTube', href: '#' },
        ],
        legalLinks: [
            { title: 'Terms of Service – Consumer', href: '#' },
            { title: 'Terms of Service – Commercial', href: '#' },
            { title: 'Privacy Policy', href: '#' },
            { title: 'Usage Policy', href: '#' },
            { title: 'Responsible Disclosure Policy', href: '#' },
            { title: 'Compliance', href: '#' },
            { title: 'Privacy Choices', href: '#' },
        ]
    };

    return (
        <footer className="bg-[#111111] text-gray-400 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-4 gap-8">
                    {/* Logo Column */}
                    <div>
                        <img
                            src={kainosLogo}
                            alt="Spark logo"
                            style={{
                                objectFit: 'cover',
                                width: '140px',  // Added width to control size
                                height: 'auto'   // Maintain aspect ratio
                            }}
                        />
                    </div>

                    {/* Product Links */}
                    <div>
                        {footerLinks.productLinks.map((link) => (
                            <div key={link.title} className="mb-2">
                                <a href={link.href} className="hover:text-white transition-colors">
                                    {link.title}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Support Links */}
                    <div>
                        {footerLinks.supportLinks.map((link) => (
                            <div key={link.title} className="mb-2">
                                <a href={link.href} className="hover:text-white transition-colors">
                                    {link.title}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Legal Links */}
                    <div>
                        {footerLinks.legalLinks.map((link) => (
                            <div key={link.title} className="mb-2">
                                <a href={link.href} className="hover:text-white transition-colors">
                                    {link.title}
                                </a>
                            </div>
                        ))}
                        <div className="mt-4 text-sm">© 2024 Kainos</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;