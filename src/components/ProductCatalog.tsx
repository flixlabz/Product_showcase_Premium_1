import { motion } from 'framer-motion';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const ProductCatalog = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-20 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary font-black tracking-[0.5em] uppercase text-xs mb-4 block"
                    >
                        Official Collection
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase"
                    >
                        THE <span className="text-primary italic text-shadow-glow">LABS</span> INVENTORY
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-foreground/40 mt-6 max-w-2xl mx-auto text-lg font-medium"
                    >
                        Explore our complete line of molecularly engineered hydration solutions. Each formula is crafted for specific physiological thresholds.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative glass-card rounded-[3rem] p-8 border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden"
                        >
                            {/* Animated Background Gradient */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                                style={{ background: `radial-gradient(circle at center, ${product.accentColor}, transparent 70%)` }}
                            />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <span className="px-4 py-1.5 bg-foreground/5 border border-border/50 rounded-full text-[10px] font-black tracking-widest uppercase text-foreground/60 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                        {product.category}
                                    </span>
                                    <span className="text-2xl font-black text-foreground italic">{product.price}</span>
                                </div>

                                <div className="aspect-square mb-8 relative group-hover:scale-110 transition-transform duration-700 ease-out">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                                    />
                                    {/* Product Glow */}
                                    <div
                                        className="absolute inset-0 blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity"
                                        style={{ backgroundColor: product.accentColor }}
                                    />
                                </div>

                                <h2 className="text-3xl font-black tracking-tighter mb-2 group-hover:text-primary transition-colors">
                                    {product.title}
                                </h2>
                                <p className="text-foreground/40 font-bold italic mb-6 uppercase text-sm">{product.subtitle}</p>

                                <p className="text-foreground/60 mb-8 line-clamp-2 font-medium">
                                    {product.description}
                                </p>

                                <div className="flex gap-3">
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="flex-grow flex items-center justify-center gap-2 py-4 bg-primary text-white font-black rounded-2xl text-xs tracking-widest uppercase hover:shadow-[0_10px_20px_rgba(255,107,53,0.3)] transition-all"
                                    >
                                        View Product <ArrowRight size={16} />
                                    </Link>
                                    <button className="w-14 h-14 flex items-center justify-center bg-foreground/5 text-foreground hover:bg-foreground hover:text-background rounded-2xl transition-all">
                                        <ShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCatalog;
