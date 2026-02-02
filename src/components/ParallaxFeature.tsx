import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxFeature = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-200, 200]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

    return (
        <section ref={sectionRef} className="h-screen relative overflow-hidden flex items-center justify-center bg-background pointer-events-none">
            {/* Massive Background Text */}
            <motion.div
                style={{ x: useTransform(scrollYProgress, [0, 1], [-500, 500]) }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-[0.08] dark:opacity-[0.03] select-none"
            >
                <span className="text-[40vw] font-black tracking-tighter text-foreground">GENESIS GENESIS GENESIS</span>
            </motion.div>

            <div className="relative z-10 text-center">
                <motion.div
                    style={{ y, scale, opacity, rotate }}
                    className="relative w-[50vh] h-[70vh] mx-auto"
                >
                    {/* Shadow Blob */}
                    <div className="absolute inset-x-0 -bottom-10 h-20 bg-black/40 blur-3xl rounded-full scale-x-50" />

                    <img
                        src="/images/red-edition.png"
                        alt="Molecular Hydration"
                        className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(255,107,53,0.4)]"
                    />

                    {/* Dynamic Accents */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/10 blur-[100px] -z-10 rounded-full"
                    />
                </motion.div>

                <motion.div
                    style={{ opacity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
                >
                    <h2 className="text-[10vw] font-black text-foreground mix-blend-difference pointer-events-none uppercase tracking-tighter leading-none opacity-30 dark:opacity-20">
                        THE RED EDITION
                    </h2>
                </motion.div>
            </div>

            {/* Side Floating Details */}
            <div className="absolute inset-0 flex justify-between items-center px-[20vw]">
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
                    className="hidden lg:block text-left space-y-2"
                >
                    <span className="text-primary font-black tracking-widest text-xs uppercase">Source</span>
                    <p className="text-foreground/40 font-bold uppercase text-xs">Arctic / Volcanic</p>
                </motion.div>
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
                    className="hidden lg:block text-right space-y-2"
                >
                    <span className="text-primary font-black tracking-widest text-xs uppercase">Threshold</span>
                    <p className="text-foreground/40 font-bold uppercase text-xs">Level 9 Kinetic</p>
                </motion.div>
            </div>
        </section>
    );
};

export default ParallaxFeature;
