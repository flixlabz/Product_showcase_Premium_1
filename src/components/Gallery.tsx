import { motion } from 'framer-motion';

const items = [
    { id: 1, title: "Red Bull Racing", category: "Events", size: "col-span-1 md:col-span-1 row-span-2", image: "/images/gallery/partner-6.png" },
    { id: 2, title: "Pure Energy", category: "Product", size: "col-span-1 md:col-span-1 row-span-1", image: "/images/gallery/partner-7.png" },
    { id: 3, title: "Extreme Sports", category: "Action", size: "col-span-1 md:col-span-1 row-span-1", image: "/images/gallery/partner-8.png" },
    { id: 4, title: "The Podium", category: "Formula 1", size: "col-span-1 md:col-span-1 row-span-1", image: "/images/gallery/gallery-7.png" },
    { id: 5, title: "BC One Battle", category: "Dance", size: "col-span-2 md:col-span-2 row-span-1", image: "/images/gallery/partner-9.jpg" },
    { id: 6, title: "Victory Lap", category: "Champions", size: "col-span-1 md:col-span-1 row-span-1", image: "/images/gallery/gallery-10.png" },
    { id: 7, title: "Gaming Arena", category: "Esports", size: "col-span-1 md:col-span-1 row-span-1", image: "/images/gallery/partner-10.png" },
    { id: 8, title: "Night Fireworks", category: "Grand Prix", size: "col-span-2 md:col-span-2 row-span-1", image: "/images/gallery/gallery-9.png" },
    { id: 9, title: "Quicksand", category: "Challenge", size: "col-span-1 md:col-span-1 row-span-2", image: "/images/gallery/gallery-8.png" },
    { id: 10, title: "Future Labz", category: "Innovation", size: "col-span-1 md:col-span-1 row-span-1", image: "/images/gallery/br-2.png" },
    { id: 11, title: "The Formula", category: "Research", size: "col-span-1 md:col-span-1 row-span-1", image: "/images/gallery/br-3.png" },
    { id: 12, title: "Modern HQ", category: "Facilities", size: "col-span-1 md:col-span-1 row-span-1", image: "/images/gallery/br-1.png" },
];

const Gallery = () => {
    return (
        <section id="gallery" className="py-24 bg-foreground/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-16 px-2">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">The Vision</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-2 tracking-tighter text-foreground">OUR GALLERY</h2>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-foreground/50 hover:text-foreground font-bold text-sm tracking-widest uppercase pb-1 border-b-2 border-primary/20 hover:border-primary transition-all"
                    >
                        View All
                    </motion.button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[300px]">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`${item.size} group relative overflow-hidden rounded-3xl bg-foreground/5 cursor-pointer`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 z-10" />

                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="text-primary text-xs font-black tracking-widest uppercase mb-2 block">{item.category}</span>
                                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                            </div>

                            {/* Animated Corner Accent */}
                            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
