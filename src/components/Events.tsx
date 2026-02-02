import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const events = [
    {
        date: "MAR 15, 2026",
        title: "The Genesis Launch",
        location: "Neo Tokyo, JPN",
        attendees: "2,500+",
        image: "from-blue-600/20 to-purple-600/20",
    },
    {
        date: "APR 22, 2026",
        title: "Global Bio-Summit",
        location: "Berlin, DEU",
        attendees: "1,200+",
        image: "from-orange-600/20 to-red-600/20",
    },
    {
        date: "MAY 30, 2026",
        title: "Future of Performance",
        location: "Virtual Reality",
        attendees: "10,000+",
        image: "from-emerald-600/20 to-blue-600/20",
    }
];

const Events = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // MOMENTS text transform: Starts big and fully opaque in front, then recedes and fades
    const textScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [2.5, 1, 0.6]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [1, 0.8, 0.1, 0]);
    const textZ = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

    return (
        <section id="events" ref={containerRef} className="py-32 relative min-h-[200vh] bg-background">
            {/* Immersive Background MOMENTS Text */}
            <motion.div
                style={{
                    scale: textScale,
                    opacity: textOpacity,
                    zIndex: textZ
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            >
                <span className="text-[30vw] font-black text-primary tracking-tighter leading-none">
                    MOMENTS
                </span>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-24 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-sm block mb-4"
                    >
                        The Experience
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase"
                    >
                        Upcoming <span className="text-primary italic">Events</span>
                    </motion.h2>
                </div>

                <ScrollStack
                    useWindowScroll={true}
                    itemStackDistance={40}
                    baseScale={0.8}
                    itemScale={0.05}
                    stackPosition="15%"
                >
                    {events.map((event) => (
                        <ScrollStackItem key={event.title}>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group glass-card flex flex-col md:flex-row items-center gap-10 p-10 md:p-14 rounded-[3.5rem] bg-white/[0.04] backdrop-blur-xl transition-all duration-700 border border-white/10 hover:border-primary/40 shadow-2xl overflow-hidden relative"
                            >
                                {/* Animated Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className={`w-full md:w-80 h-64 rounded-[2.5rem] bg-gradient-to-br ${event.image} flex items-center justify-center shrink-0 relative overflow-hidden group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-700`}>
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
                                    <Calendar className="w-20 h-20 text-white/10 group-hover:scale-110 group-hover:text-primary transition-all duration-1000 relative z-10" />
                                </div>

                                <div className="flex-grow relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="px-5 py-2 bg-primary text-white text-[12px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">{event.date}</span>
                                    </div>
                                    <h3 className="text-4xl md:text-6xl font-black mb-8 group-hover:text-primary transition-colors leading-[0.9] text-foreground uppercase tracking-tight">{event.title}</h3>
                                    <div className="flex flex-wrap gap-10">
                                        <div className="flex items-center gap-4 text-foreground/40 group/item">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500">
                                                <MapPin size={24} />
                                            </div>
                                            <span className="text-lg font-bold tracking-tight text-foreground/70">{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-foreground/40 group/item">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500">
                                                <Users size={24} />
                                            </div>
                                            <span className="text-lg font-bold tracking-tight text-foreground/70">{event.attendees} attending</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-6 bg-primary text-white font-black rounded-[2rem] text-sm shrink-0 mt-8 md:mt-0 tracking-[0.2em] uppercase transition-all shadow-[0_15px_30px_rgba(255,107,53,0.3)] hover:shadow-primary/50"
                                >
                                    SECURE SPOT
                                </motion.button>
                            </motion.div>
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>
        </section>
    );
};

export default Events;
