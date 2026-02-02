const Footer = () => {
    return (
        <footer className="py-20 border-t border-border bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <a href="#" className="text-3xl font-black tracking-tighter text-primary block mb-6">
                            FLIXLABZ<span className="text-foreground">.</span>
                        </a>
                        <p className="text-foreground/40 text-sm leading-relaxed mb-8">
                            Pushing the boundaries of human performance through science-backed nutrition and advanced bio-hacking.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-foreground font-black text-sm uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors text-sm font-medium">About Us</a></li>
                            <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors text-sm font-medium">Careers</a></li>
                            <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors text-sm font-medium">Press Kit</a></li>
                            <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors text-sm font-medium">Privacy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-black text-sm uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors text-sm font-medium">Help Center</a></li>
                            <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors text-sm font-medium">Shipping Info</a></li>
                            <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors text-sm font-medium">Returns</a></li>
                            <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors text-sm font-medium">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-black text-sm uppercase tracking-widest mb-6">Newsletter</h4>
                        <p className="text-foreground/40 text-xs mb-4">Stay ahead of the curve. Join our elite list.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="bg-foreground/5 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary flex-grow text-foreground shadow-sm"
                            />
                            <button className="px-4 py-3 bg-primary text-white font-black rounded-xl text-xs hover:bg-primary/80 transition-all">
                                JOIN
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-foreground/20 text-xs font-medium">
                        © 2026 FLIXLABZ INDUSTRIES. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-foreground/20 hover:text-foreground transition-colors text-xs uppercase tracking-widest font-bold">Terms</a>
                        <a href="#" className="text-foreground/20 hover:text-foreground transition-colors text-xs uppercase tracking-widest font-bold">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
