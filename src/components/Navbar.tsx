import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Initial theme setup
        if (theme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    };

    const navLinks = [
        { name: 'Home', href: '/', isHash: false },
        { name: 'Products', href: '/products', isHash: false },
        { name: 'Services', href: '/#services', isHash: true },
        { name: 'Gallery', href: '/#gallery', isHash: true },
        { name: 'Events', href: '/#events', isHash: true },
        { name: 'Contact', href: '/#contact', isHash: true },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'h-20 bg-background/80 backdrop-blur-md border-b border-border' : 'h-24 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-3 group"
                >
                    <img
                        src="/images/logo.png"
                        alt="FLixLabZ Logo"
                        className="h-8 w-auto dark:invert dark:brightness-100 dark:contrast-100 transition-all group-hover:scale-110"
                        style={{ filter: theme === 'dark' ? 'invert(1) brightness(2)' : 'none' }}
                    />
                    <span className="text-2xl font-black tracking-tighter text-foreground">
                        FLixLabZ<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {link.isHash ? (
                                <a
                                    href={link.href}
                                    className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                                </a>
                            ) : (
                                <Link
                                    to={link.href}
                                    className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                                </Link>
                            )}
                        </motion.div>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-primary"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-primary text-white font-bold rounded-full text-sm hover:shadow-[0_0_20px_rgba(255,107,53,0.4)] transition-all"
                    >
                        Get Started
                    </motion.button>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground/70"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        className="text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                link.isHash ? (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                            <button className="w-full py-3 bg-primary text-white font-bold rounded-xl mt-2">
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
