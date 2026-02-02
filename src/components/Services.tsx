import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Zap, Shield, Cpu, Wind, Target } from 'lucide-react';

const services = [
    {
        title: "Performance Optimization",
        description: "Advanced bio-hacking formula designed to push your cognitive and physical limits.",
        icon: <Zap className="w-8 h-8" />,
        color: "from-orange-500/20 to-orange-500/0",
        accent: "text-orange-500",
        bgIcon: "bg-orange-500/10"
    },
    {
        title: "Immune Shield",
        description: "Multi-layered defense system to keep you operational in any environment.",
        icon: <Shield className="w-8 h-8" />,
        color: "from-blue-500/20 to-blue-500/0",
        accent: "text-blue-500",
        bgIcon: "bg-blue-500/10"
    },
    {
        title: "Neuro-Sync",
        description: "Focus and clarity modules integrated into every dose for precision performance.",
        icon: <Cpu className="w-8 h-8" />,
        color: "from-purple-500/20 to-purple-500/0",
        accent: "text-purple-500",
        bgIcon: "bg-purple-500/10"
    },
    {
        title: "Rapid Recovery",
        description: "Accelerated cellular repair technology to minimize downtime between sessions.",
        icon: <Wind className="w-8 h-8" />,
        color: "from-green-500/20 to-green-500/0",
        accent: "text-green-500",
        bgIcon: "bg-green-500/10"
    },
    {
        title: "Strategic Nutrition",
        description: "Precision-calibrated macronutrients for the tactical athlete and modern pro.",
        icon: <Target className="w-8 h-8" />,
        color: "from-red-500/20 to-red-500/0",
        accent: "text-red-500",
        bgIcon: "bg-red-500/10"
    }
];

const TimelineDot = ({ index }: { index: number }) => {
    const dotRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: dotRef,
        offset: ["start end", "end start"]
    });

    // Trail effect: the dot moves vertically at a different speed than the card
    const yTransform = useTransform(scrollYProgress, [0, 1], [-150, 150]);
    const ySpring = useSpring(yTransform, { stiffness: 40, damping: 25 });

    return (
        <motion.div
            ref={dotRef}
            style={{ y: ySpring }}
            className="absolute left-1/2 -translate-x-1/2 w-8 h-8 z-20 hidden md:flex items-center justify-center pointer-events-none"
        >
            <div className="w-5 h-5 bg-primary rounded-full shadow-[0_0_30px_rgba(255,107,0,1)] border-4 border-background" />
            <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/40 rounded-full blur-xl"
            />
        </motion.div>
    );
};

const Services = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

    return (
        <section id="services" ref={containerRef} className="py-32 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-8xl font-black mb-8 tracking-tighter uppercase"
                    >
                        Precision <span className="text-primary italic">Capabilities</span>
                    </motion.div>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '160px' }}
                        viewport={{ once: true }}
                        className="h-2.5 bg-primary rounded-full"
                    />
                </div>

                <div className="relative">
                    {/* Industrial Background line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/5 hidden md:block" />

                    {/* Glowing Progress Line */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-transparent z-10 hidden md:block shadow-[0_0_20px_rgba(255,107,0,0.3)]"
                    />

                    <div className="space-y-48">
                        {services.map((service, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div key={service.title} className="relative flex items-center w-full">
                                    {/* Connection Dot with Trailing Effect */}
                                    <TimelineDot index={index} />

                                    {/* Card Container */}
                                    <div className={`flex w-full min-h-[300px] ${isLeft ? 'justify-start pr-8 md:pr-32 md:w-1/2' : 'justify-end pl-8 md:pl-32 md:w-1/2 md:ml-auto'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: isLeft ? -120 : 120, scale: 0.85 }}
                                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                            viewport={{ once: true, margin: "-150px" }}
                                            transition={{ duration: 1, type: "spring", stiffness: 60, damping: 15 }}
                                            className={`w-full max-w-lg group cursor-target ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                                        >
                                            <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden transition-all duration-700 hover:scale-[1.04] hover:shadow-[0_40px_80px_rgba(255,107,0,0.2)] border border-white/5 group-hover:border-primary/40">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                                                <div className={`relative z-10 flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                                                    <div className={`mb-8 p-6 w-fit ${service.bgIcon} ${service.accent} rounded-2xl md:rounded-3xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner group-hover:shadow-primary/60`}>
                                                        {service.icon}
                                                    </div>
                                                    <h3 className="text-2xl md:text-5xl font-black mb-6 group-hover:text-primary transition-colors uppercase tracking-tighter leading-[0.9]">
                                                        {service.title}
                                                    </h3>
                                                    <p className="text-lg md:text-2xl text-foreground/50 leading-relaxed font-medium transition-colors group-hover:text-foreground/90">
                                                        {service.description}
                                                    </p>
                                                </div>

                                                {/* Corner Decorative Elements */}
                                                <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 -translate-y-4 translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0" />
                                                <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 -translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0" />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
