import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    accentColor: string;
    reverse?: boolean;
    specs: { label: string; value: string }[];
}

const ShowcaseItem = ({ product, onInView }: { product: ProductProps; onInView: (isInView: boolean) => void }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { reverse, id } = product;
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.3 });

    useEffect(() => {
        onInView(isInView);
    }, [isInView, onInView]);

    // Specific theme logic for NITRO BLUE
    const isNitroBlue = id === 'nitro-blue';

    // Animation variants for "popping" effect
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { scale: 0.6, opacity: 0, y: 50 },
        visible: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`relative min-h-screen flex items-center justify-center py-32 transition-all duration-1000`}
        >
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    animate={{
                        x: isExpanded ? (reverse ? 100 : -100) : 0,
                        opacity: isExpanded ? 0.3 : 1,
                        scale: isExpanded ? 0.95 : 1
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}
                >
                    {/* Image Section */}
                    <motion.div
                        variants={itemVariants}
                        className={`relative ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                        <div className={`absolute -top-20 ${reverse ? '-right-20' : '-left-20'} w-80 h-80 ${isNitroBlue ? 'bg-blue-400/20' : 'bg-primary/20'} rounded-full blur-[100px] animate-pulse`} />
                        <motion.div
                            whileHover={{ scale: isExpanded ? 1 : 1.15, rotate: isExpanded ? 0 : (reverse ? 5 : -5) }}
                            transition={{ type: "spring", stiffness: 400, damping: 12 }}
                            className={`relative z-10 glass-card p-8 rounded-[4rem] overflow-hidden transition-colors ${isNitroBlue ? 'border-blue-400/20 shadow-[0_0_80px_rgba(59,130,246,0.3)] bg-blue-500/5' : 'bg-white/5'}`}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className={`w-full h-auto object-contain transition-transform duration-700 ${isNitroBlue ? 'drop-shadow-[0_0_60px_rgba(59,130,246,0.8)] scale-110' : 'drop-shadow-[0_20px_50px_rgba(255,0,0,0.3)]'}`}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        variants={itemVariants}
                        className={`flex flex-col gap-6 ${reverse ? 'lg:order-1 lg:items-start' : 'lg:order-2'}`}
                    >
                        <motion.span
                            variants={itemVariants}
                            className={`${isNitroBlue ? 'text-blue-400' : 'text-primary'} font-black tracking-[0.5em] uppercase text-xs`}
                        >
                            New Generation
                        </motion.span>
                        <motion.h2
                            variants={itemVariants}
                            className={`text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] lowercase ${isNitroBlue ? 'text-white' : 'text-foreground'}`}
                        >
                            {product.title.split(' ')[0]} <br /> <span className={`${isNitroBlue ? 'text-blue-400' : 'text-primary'} uppercase`}>{product.title.split(' ')[1]}</span>
                        </motion.h2>
                        <motion.h3
                            variants={itemVariants}
                            className={`text-3xl md:text-4xl font-bold italic ${isNitroBlue ? 'text-blue-200/40' : 'text-foreground/50 dark:text-foreground/40'}`}
                        >
                            {product.subtitle}
                        </motion.h3>
                        <motion.p
                            variants={itemVariants}
                            className={`text-xl leading-relaxed max-w-md font-medium ${isNitroBlue ? 'text-blue-100/70' : 'text-foreground/70 dark:text-foreground/60'}`}
                        >
                            {product.description}
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8">
                            <Link
                                to={`/product/${product.id}`}
                                className={`px-10 py-5 ${isNitroBlue ? 'bg-blue-600 hover:bg-blue-500' : 'bg-primary'} text-white font-black rounded-full text-sm tracking-widest uppercase shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center`}
                            >
                                View Details
                            </Link>
                            <motion.button
                                onClick={() => setIsExpanded(true)}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-10 py-5 border-2 ${isNitroBlue ? 'border-blue-400/30 hover:border-blue-400 text-white' : 'border-foreground/20 hover:border-foreground text-foreground'} font-black rounded-full text-sm tracking-widest uppercase transition-all backdrop-blur-md`}
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Learn More Side Panel */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ x: reverse ? "-100%" : "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: reverse ? "-100%" : "100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className={`absolute top-0 ${reverse ? 'left-0' : 'right-0'} w-full lg:w-1/2 h-full z-50 flex items-center bg-black/40 backdrop-blur-2xl px-6`}
                        >
                            <div className={`p-12 glass-card rounded-[3.5rem] ${reverse ? 'border-r-4' : 'border-l-4'} ${isNitroBlue ? 'border-blue-500 bg-blue-900/60' : 'border-primary'} relative w-full h-fit shadow-2xl`}>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className={`absolute top-8 ${reverse ? 'left-8' : 'right-8'} p-3 hover:bg-white/10 rounded-full transition-colors`}
                                >
                                    <X className={`w-8 h-8 ${isNitroBlue ? 'text-blue-400' : 'text-primary'}`} />
                                </button>

                                <span className={`${isNitroBlue ? 'text-blue-400' : 'text-primary'} font-black tracking-[0.3em] uppercase text-xs mb-4 block`}>Product Dossier</span>
                                <h3 className={`text-4xl font-black mb-8 tracking-tighter uppercase italic ${isNitroBlue ? 'text-white' : 'text-foreground'}`}>Technical Specifications</h3>

                                <ul className="space-y-6">
                                    {product.specs.map((spec, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className={`flex items-center justify-between border-b pb-4 ${isNitroBlue ? 'border-white/10' : 'border-foreground/10'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 ${isNitroBlue ? 'bg-blue-400' : 'bg-primary'} rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]`} />
                                                <span className={`font-bold uppercase text-xs tracking-widest ${isNitroBlue ? 'text-white/60' : 'text-foreground/60'}`}>{spec.label}</span>
                                            </div>
                                            <span className={`font-black ${isNitroBlue ? 'text-white' : 'text-foreground'}`}>{spec.value}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className={`mt-12 p-6 rounded-2xl border ${isNitroBlue ? 'bg-blue-400/10 border-blue-400/20' : 'bg-primary/5 border-primary/20'}`}>
                                    <p className={`font-medium italic leading-relaxed ${isNitroBlue ? 'text-white/90' : 'text-foreground/80'}`}>
                                        "The {product.subtitle} represents our most significant leap in hydration technology, utilizing rare mineral-rich sources combined with high-precision profiling."
                                    </p>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className={`mt-8 flex items-center gap-2 font-black uppercase text-xs tracking-tighter ${isNitroBlue ? 'text-blue-400' : 'text-primary'}`}
                                >
                                    <Check className="w-4 h-4" /> Lab Certified Excellence
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

const products: ProductProps[] = [
    {
        id: "ultra-pure",
        title: "ULTRA PURE",
        subtitle: "GEN-2 FORMULA",
        image: "/images/red-edition.png",
        description: "Engineered for maximum cognitive threshold and cellular vitality. The ultimate fuel for the modern high-performer.",
        accentColor: "rgba(255,0,0,0.3)",
        specs: [
            { label: "Bio-Availability", value: "98.4% Nano-Extracted" },
            { label: "Recovery Delta", value: "-40% Downtime" },
            { label: "Concentration", value: "Triple-Shot Essence" },
            { label: "Purity Grade", value: "Ultra-Premium Volcanic" }
        ]
    },
    {
        id: "nitro-blue",
        title: "NITRO BLUE",
        subtitle: "HYBRID CORE",
        image: "/images/blue-edition.png",
        description: "Sustained-release kinetic energy with a cold-filtered electrolyte matrix. Designed for extended neural endurance.",
        accentColor: "rgba(0,0,255,0.3)",
        reverse: true,
        specs: [
            { label: "Hydration Index", value: "X-20 Fluid Matrix" },
            { label: "Neural Latency", value: "-12ms Response" },
            { label: "pH Level", value: "7.4 Optimized" },
            { label: "Active Ions", value: "99.9% Purity" }
        ]
    }
];

const ProductShowcase = () => {
    const [activeProduct, setActiveProduct] = useState<string | null>(null);

    return (
        <section className="relative overflow-hidden bg-background">
            {/* Global Immersive Backgrounds */}
            <AnimatePresence>
                {activeProduct === 'nitro-blue' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-0 pointer-events-none bg-[#000b2e]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-black to-blue-900/10" />
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.4, 0.2],
                                rotate: [0, 180, 360]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-40 select-none"
                        >
                            <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_0,transparent_70%)] blur-[150px]" />
                        </motion.div>
                    </motion.div>
                )}
                {activeProduct === 'ultra-pure' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-0 pointer-events-none bg-[#1a0505]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black to-red-900/10" />
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.3, 0.1],
                                rotate: [360, 180, 0]
                            }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] opacity-40 select-none"
                        >
                            <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0,transparent_70%)] blur-[150px]" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 w-full">
                {products.map((product) => (
                    <ShowcaseItem
                        key={product.id}
                        product={product}
                        onInView={(isInView) => {
                            if (isInView) setActiveProduct(product.id);
                            else if (activeProduct === product.id) setActiveProduct(null);
                        }}
                    />
                ))}
            </div>

            {/* View All Products CTA */}
            <div className="relative z-10 py-24 flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl"
                >
                    <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter uppercase mb-6 italic">
                        Explore the Full <span className="text-primary">Molecular</span> Catalog
                    </h2>
                    <p className="text-foreground/40 text-lg mb-12 font-medium">
                        Our complete range of molecularly engineered hydration solutions is now available. Discover the formula that matches your threshold.
                    </p>
                    <Link
                        to="/products"
                        className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black rounded-full text-sm tracking-widest uppercase overflow-hidden transition-all hover:bg-primary hover:text-white"
                    >
                        See All 10+ Formulas
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductShowcase;
