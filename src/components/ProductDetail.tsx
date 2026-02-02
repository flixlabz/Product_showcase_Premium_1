import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { ArrowLeft, ShoppingCart, Zap, Shield, Droplets } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === id);
    const [activeImage, setActiveImage] = useState(0);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-foreground mb-4 uppercase">Product Not Found</h1>
                    <Link to="/products" className="text-primary font-black uppercase tracking-widest hover:underline">Back to Inventory</Link>
                </div>
            </div>
        );
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 }
        })
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
            {/* Immersive Background Glow */}
            <div
                className="fixed top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none blur-[100px]"
                style={{ backgroundColor: product.accentColor }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors font-black uppercase text-xs tracking-widest mb-12 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Inventory
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Media Gallery Section */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square glass-card rounded-[4rem] p-12 flex items-center justify-center relative overflow-hidden border-2 border-primary/10 shadow-[0_0_80px_rgba(255,107,53,0.1)]"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    initial={{ opacity: 0, x: 20, rotate: 5 }}
                                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                                    exit={{ opacity: 0, x: -20, rotate: -5 }}
                                    src={product.gallery[activeImage] || product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                                />
                            </AnimatePresence>

                            {/* Static Product Info Accent */}
                            <div className="absolute top-12 left-12">
                                <span className="text-primary font-black text-6xl opacity-5 tracking-tighter uppercase whitespace-pre leading-none">
                                    {product.title}
                                </span>
                            </div>
                        </motion.div>

                        <div className="flex gap-4">
                            {product.gallery.map((img, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveImage(i)}
                                    className={`w-28 h-28 rounded-3xl p-4 glass-card border-2 transition-all overflow-hidden ${activeImage === i ? 'border-primary ring-4 ring-primary/20 scale-105' : 'border-border'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-contain opacity-60 group-hover:opacity-100" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col gap-8">
                        <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
                            <span className="text-primary font-black tracking-[0.4em] uppercase text-sm mb-4 block">Product Dossier</span>
                            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.85] mb-4 uppercase">
                                {product.title.split(' ')[0]} <br />
                                <span className="text-primary italic opacity-90">{product.title.split(' ')[1]}</span>
                            </h1>
                            <p className="text-3xl font-bold text-foreground/40 italic uppercase">{product.subtitle}</p>
                        </motion.div>

                        <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible" className="flex items-center gap-6 py-2">
                            <span className="text-4xl font-black text-foreground">{product.price}</span>
                            <div className="h-8 w-[1px] bg-border" />
                            <span className="px-5 py-2 bg-primary/10 text-primary font-black rounded-full uppercase text-xs tracking-widest border border-primary/20 italic">
                                {product.category}
                            </span>
                        </motion.div>

                        <motion.p
                            custom={2}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-xl text-foreground/60 leading-relaxed font-medium"
                        >
                            {product.longDescription}
                        </motion.p>

                        <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible" className="grid grid-cols-2 gap-4">
                            {product.specs.map((spec, i) => (
                                <div key={i} className="p-6 glass-card rounded-3xl border border-border/40 group hover:border-primary/30 transition-all">
                                    <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{spec.label}</p>
                                    <p className="text-lg font-black text-foreground">{spec.value}</p>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible" className="space-y-6 pt-6">
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-grow flex items-center justify-center gap-3 py-6 bg-primary text-white font-black rounded-3xl text-sm tracking-widest uppercase shadow-[0_15px_30px_rgba(255,107,53,0.3)] hover:shadow-primary/50 transition-all"
                                >
                                    <ShoppingCart size={20} /> Add to Collection
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-6 border-2 border-foreground/10 text-foreground font-black rounded-3xl text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all"
                                >
                                    Find Nearby
                                </motion.button>
                            </div>

                            <div className="flex justify-between items-center text-foreground/30 font-black uppercase text-[10px] tracking-tighter px-2">
                                <div className="flex items-center gap-2"><Droplets size={14} className="text-primary" /> Instant Hydration</div>
                                <div className="flex items-center gap-2"><Zap size={14} className="text-primary" /> Energy Matrix</div>
                                <div className="flex items-center gap-2"><Shield size={14} className="text-primary" /> Bio-A Certified</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Additional Tech Section */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-24 border-t border-border/50"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black text-foreground italic uppercase tracking-tighter mb-4">Molecular Breakdown</h2>
                        <p className="text-foreground/40 max-w-xl mx-auto font-bold uppercase text-xs tracking-[0.2em]">Visualizing the internal chemistry of {product.title}</p>
                    </div>

                    <div className="relative">
                        {/* Desktop Connector Line */}
                        <div className="absolute top-8 left-[10%] right-[10%] h-[2px] bg-white/5 hidden md:block">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="h-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(255,107,53,0.5)]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            {/* Pure Source */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="relative group"
                            >
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(255,107,53,0.8)] z-20 hidden md:block" />
                                <div className="p-10 glass-card rounded-[3rem] text-center space-y-4 pt-16 hover:bg-white/[0.06] transition-colors duration-500">
                                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                        <Droplets size={32} />
                                    </div>
                                    <h4 className="text-xl font-black text-foreground uppercase tracking-tight">Pure Source</h4>
                                    <p className="text-foreground/50 text-sm font-medium leading-relaxed">Sourced from the deepest volcanic aquifers for unparalleled mineral purity.</p>
                                </div>
                            </motion.div>

                            {/* Kinetic Release */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(255,107,53,0.8)] z-20 hidden md:block" />
                                <div className="p-10 glass-card rounded-[3rem] text-center space-y-4 pt-16 border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-500">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <Zap size={32} />
                                    </div>
                                    <h4 className="text-xl font-black text-foreground uppercase tracking-tight">Kinetic Release</h4>
                                    <p className="text-foreground/50 text-sm font-medium leading-relaxed">Time-released electrolyte capsules ensure sustained physical endurance.</p>
                                </div>
                            </motion.div>

                            {/* Neuro Guard */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative group"
                            >
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(255,107,53,0.8)] z-20 hidden md:block" />
                                <div className="p-10 glass-card rounded-[3rem] text-center space-y-4 pt-16 hover:bg-white/[0.06] transition-colors duration-500">
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                        <Shield size={32} />
                                    </div>
                                    <h4 className="text-xl font-black text-foreground uppercase tracking-tight">Neuro Guard</h4>
                                    <p className="text-foreground/50 text-sm font-medium leading-relaxed">Proprietary nootropic blend protects neurological pathways from stress.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default ProductDetail;
