import { motion } from 'framer-motion';
import { Send, Mail, Phone, Globe } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="glass-card rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
                    {/* Info Side */}
                    <div className="lg:w-2/5 bg-primary p-12 md:p-16 flex flex-col justify-between text-white relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">LET'S START <br />THE TALK.</h2>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Email Us</p>
                                        <p className="font-bold">hello@flixlabz.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Call Us</p>
                                        <p className="font-bold">+1 (888) FLIX-LAB</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Headquarters</p>
                                        <p className="font-bold">Silicon Valley, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-12 border-t border-white/10 flex gap-6">
                            {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                                <a key={social} href="#" className="text-sm font-black uppercase tracking-tighter hover:text-accent transition-colors">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:w-3/5 p-12 md:p-16 bg-background/50">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-foreground/5 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-foreground/5 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-1">Inquiry Type</label>
                                <select className="w-full bg-foreground/5 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-all text-foreground/60 appearance-none">
                                    <option className="bg-background text-foreground">Collaboration</option>
                                    <option className="bg-background text-foreground">Product Support</option>
                                    <option className="bg-background text-foreground">Investment</option>
                                    <option className="bg-background text-foreground">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-1">Your Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us what's on your mind..."
                                    className="w-full bg-foreground/5 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-foreground resize-none"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 bg-gradient-to-r from-primary to-orange-600 text-white font-black rounded-2xl shadow-xl flex items-center justify-center gap-3"
                            >
                                SEND MESSAGE <Send size={18} />
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
