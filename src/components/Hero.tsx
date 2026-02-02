import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    // Generate static random positions for decorative elements
    const plusPositions = useMemo(() => [...Array(6)].map(() => ({
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        duration: 10 + Math.random() * 10
    })), []);

    const dotPositions = useMemo(() => [...Array(8)].map(() => ({
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        duration: 5 + Math.random() * 5
    })), []);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Sequence Calculations
    // 0.0 - 0.2: Title "FlixLabZ" is main focus
    // 0.2 - 0.5: Can pops up
    // 0.5 - 0.7: Model Name "ULTRA PURE" pops up
    // 0.7 - 1.0: Whole thing fades slightly

    // Title Title Transformation
    const titleScale = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.8, 0.5]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0.1]);
    const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

    // Can Transformation
    const canScale = useTransform(scrollYProgress, [0.15, 0.4, 0.8], [0, 1.2, 1]);
    const canY = useTransform(scrollYProgress, [0.15, 0.4], [300, 0]);
    const canRotate = useTransform(scrollYProgress, [0.2, 0.6], [-15, 0]);
    const canOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

    // Model Name Transformation
    const modelY = useTransform(scrollYProgress, [0.45, 0.6], [50, 0]);
    const modelScale = useTransform(scrollYProgress, [0.45, 0.6], [0.8, 1]);

    // Background Gradient based on scroll
    const bgOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.6]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-primary">
            <motion.div
                style={{ opacity: bgOpacity }}
                className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
            >
                {/* Immersive Background Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0,transparent_70%)]" />

                {/* Floating Laboratory Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {plusPositions.map((pos, i) => (
                        <motion.div
                            key={`plus-${i}`}
                            initial={{
                                x: pos.x,
                                y: pos.y,
                                opacity: 0.1
                            }}
                            animate={{
                                y: ["-20px", "20px", "-20px"],
                                x: ["-10px", "10px", "-10px"],
                                rotate: [0, 90, 180, 270, 360]
                            }}
                            transition={{
                                duration: pos.duration,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute text-white/20 font-light text-4xl"
                        >
                            +
                        </motion.div>
                    ))}
                    {dotPositions.map((pos, i) => (
                        <motion.div
                            key={`dot-${i}`}
                            initial={{
                                x: pos.x,
                                y: pos.y,
                                opacity: 0.1
                            }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: pos.duration,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute w-2 h-2 bg-white rounded-full blur-[2px]"
                        />
                    ))}
                    {/* Large Blurred Molecular Orb */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 50, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-[100px]"
                    />
                </div>

                {/* Title Section */}
                <motion.div
                    style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
                    className="absolute z-10"
                >
                    <h1 className="text-[15vw] md:text-[12vw] font-[1000] tracking-tighter text-white uppercase leading-none select-none">
                        FLIX<span className="italic outline-text">LABZ</span>
                    </h1>
                </motion.div>

                {/* Animated Can Section */}
                <motion.div
                    style={{
                        scale: canScale,
                        y: canY,
                        rotate: canRotate,
                        opacity: canOpacity
                    }}
                    className="relative z-20 w-[60vh] h-[60vh] flex items-center justify-center pointer-events-none"
                >
                    <img
                        src="/images/red-edition.png"
                        alt="Energy Drink Can"
                        className="w-full h-full object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                    />

                    {/* Glowing Aura around the can */}
                    <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full scale-75 animate-pulse" />
                </motion.div>

                {/* Model Name Section */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0.45, 0.6, 0.8, 1], [0, 1, 1, 0.4]),
                        y: modelY,
                        scale: modelScale
                    }}
                    className="absolute bottom-20 z-30 text-center"
                >
                    <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-2">
                        Ultra <span className="text-black/20">Pure</span>
                    </h2>
                    <div className="h-2 w-32 bg-white mx-auto rounded-full" />
                    <p className="mt-4 text-white/60 font-black tracking-[0.5em] uppercase text-xs">Gen-2 Formula / Hybrid Core</p>
                </motion.div>

                {/* Bottom Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="absolute bottom-10 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-12 bg-white/30" />
                </motion.div>
            </motion.div>

            {/* Transition Overlay to the next section */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
