export interface Product {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    accentColor: string;
    reverse?: boolean;
    specs: { label: string; value: string }[];
    longDescription: string;
    gallery: string[];
    price: string;
    category: string;
}

export const products: Product[] = [
    {
        id: "ultra-pure",
        title: "ULTRA PURE",
        subtitle: "GEN-2 FORMULA",
        image: "/images/red-edition.png",
        description: "Engineered for maximum cognitive threshold and cellular vitality.",
        accentColor: "#FF4D4D",
        specs: [
            { label: "Bio-Availability", value: "98.4% Nano-Extracted" },
            { label: "Recovery Delta", value: "-40% Downtime" },
            { label: "Concentration", value: "Triple-Shot Essence" },
            { label: "Purity Grade", value: "Ultra-Premium Volcanic" }
        ],
        longDescription: "The Gen-2 Ultra Pure formula is a masterpiece of nutritional engineering. Sourced from pristine volcanic aquifers and refined through ceramic nano-filtration, it delivers immediate cognitive enhancement and cellular hydration. Every drop is balanced with essential trace elements that optimize mitochondrial function.",
        gallery: ["/images/red-edition.png", "/images/gallery/partner-7.png", "/images/gallery/partner-8.png"],
        price: "$4.99",
        category: "Vitality"
    },
    {
        id: "nitro-blue",
        title: "NITRO BLUE",
        subtitle: "HYBRID CORE",
        image: "/images/blue-edition.png",
        description: "Sustained-release kinetic energy with a cold-filtered electrolyte matrix.",
        accentColor: "#3B82F6",
        reverse: true,
        specs: [
            { label: "Hydration Index", value: "X-20 Fluid Matrix" },
            { label: "Neural Latency", value: "-12ms Response" },
            { label: "pH Level", value: "7.4 Optimized" },
            { label: "Active Ions", value: "99.9% Purity" }
        ],
        longDescription: "Nitro Blue is designed for the endurance athlete and the night-shift creative. Its unique hybrid core releases electrolytes in phased waves, preventing the 'crash' associated with traditional energy drinks. The cold-filtration process preserves the delicate ionic balance needed for peak neural firing.",
        gallery: ["/images/blue-edition.png", "/images/gallery/partner-6.png", "/images/gallery/partner-9.jpg"],
        price: "$4.99",
        category: "Endurance"
    },
    {
        id: "zenith-gold",
        title: "ZENITH GOLD",
        subtitle: "AURUM MATRIX",
        image: "/images/red-edition.png",
        description: "A rare infusion of colloidal gold and adaptogenic root extracts.",
        accentColor: "#F59E0B",
        specs: [
            { label: "Gold Purity", value: "24K Colloidal" },
            { label: "Adaptogen Blend", value: "Custom A-List" },
            { label: "Mental Clarity", value: "+35% Focus" },
            { label: "Taste Profile", value: "Saffron & Honey" }
        ],
        longDescription: "Zenith Gold is the pinnacle of our luxury line. It combines ancient herbal wisdom with modern bio-hacking. The inclusion of colloidal gold acts as a catalyst for neural transmission, while the adaptogenic blend helps the body maintain homeostasis under extreme stress.",
        gallery: ["/images/red-edition.png", "/images/gallery/gallery-7.png"],
        price: "$12.99",
        category: "Luxury"
    },
    {
        id: "plasma-green",
        title: "PLASMA GREEN",
        subtitle: "PHYTO ARC",
        image: "/images/blue-edition.png",
        description: "Molecularly distilled chlorophyll and spirulina essence.",
        accentColor: "#10B981",
        specs: [
            { label: "Phyto Density", value: "850mg/L" },
            { label: "Oxygenation", value: "Hemo-Boost+" },
            { label: "Detox Factor", value: "Level 5 Kinetic" },
            { label: "Source", value: "Arctic Deep-Sea" }
        ],
        longDescription: "Plasma Green focuses on oxygenation and detoxification. By utilizing high-pressure CO2 extraction, we've isolated the most potent phytonutrients from deep-sea arctic flora. It's like a fresh breath for your blood stream, increasing oxygen carrying capacity and flushing metabolic waste.",
        gallery: ["/images/blue-edition.png", "/images/gallery/gallery-8.png"],
        price: "$5.99",
        category: "Wellness"
    },
    {
        id: "vortex-black",
        title: "VORTEX BLACK",
        subtitle: "SHADOW TECH",
        image: "/images/red-edition.png",
        description: "Activated carbon matrix with high-dosage caffeine anhydrous.",
        accentColor: "#111827",
        specs: [
            { label: "Caffeine", value: "280mg Pure" },
            { label: "Carbon Grade", value: "Medical Activated" },
            { label: "Metabolism", value: "Thermal Spike" },
            { label: "Finish", value: "Velvet Obsidian" }
        ],
        longDescription: "Vortex Black is not for the faint of heart. It's a high-impact stimulus designed for pre-performance peak. The activated carbon serves as a sponge for toxins, while the massive caffeine dose provides immediate aggressive focus and elevated metabolic rate.",
        gallery: ["/images/red-edition.png", "/images/gallery/gallery-9.png"],
        price: "$6.49",
        category: "Performance"
    },
    {
        id: "nebula-violet",
        title: "NEBULA VIOLET",
        subtitle: "LUCID DREAM",
        image: "/images/blue-edition.png",
        description: "Nootropic blend for enhanced dreaming and creative visualization.",
        accentColor: "#8B5CF6",
        specs: [
            { label: "Nootropics", value: "Cognizin Alpha" },
            { label: "Dream Recall", value: "Level Alpha" },
            { label: "Serotonin", value: "Natural Precursor" },
            { label: "Extracted", value: "Moonlight Bloom" }
        ],
        longDescription: "Nebula Violet bridges the gap between waking life and the subconscious. Formulated with rare nocturnal plant extracts, it supports the REM cycle and enhances lucid dreaming. Ideal for creatives and thinkers who solve problems in their sleep.",
        gallery: ["/images/blue-edition.png", "/images/gallery/gallery-10.png"],
        price: "$7.99",
        category: "Rest/Creative"
    },
    {
        id: "titan-slate",
        title: "TITAN SLATE",
        subtitle: "IRON CORE",
        image: "/images/red-edition.png",
        description: "Heavy mineral complex for bone density and muscle skeletal support.",
        accentColor: "#64748B",
        specs: [
            { label: "Calcium", value: "Structural Grade" },
            { label: "Magnesium", value: "Deep Matrix" },
            { label: "Density", value: "Core Rebuild" },
            { label: "Flavor", value: "Mineral Slate" }
        ],
        longDescription: "Titan Slate is the foundation of physical strength. It provides the essential building blocks for bone health and muscle contraction. Unlike synthetic supplements, our minerals are bound to organic fulvic acids, ensuring they reach your skeletal system directly.",
        gallery: ["/images/red-edition.png", "/images/gallery/br-1.png"],
        price: "$5.49",
        category: "Strength"
    },
    {
        id: "sonic-white",
        title: "SONIC WHITE",
        subtitle: "ECHO PULSE",
        image: "/images/blue-edition.png",
        description: "High-frequency auditory focus blend with natural electrolytes.",
        accentColor: "#F8FAFC",
        specs: [
            { label: "Auditory", value: "+15% Sensitivity" },
            { label: "Reaction", value: "Sonic Trigger" },
            { label: "Electrolytes", value: "Cloud-Mist" },
            { label: "Essence", value: "Glacier Ice" }
        ],
        longDescription: "Sonic White is tuned for reaction time. Whether you're a professional gamer or a precision musician, this formula sharpens auditory processing and visual reaction. The cloud-mist electrolytes offer the lightest, most refreshing finish in our catalog.",
        gallery: ["/images/blue-edition.png", "/images/gallery/br-2.png"],
        price: "$5.99",
        category: "Reaction"
    },
    {
        id: "lava-amber",
        title: "LAVA AMBER",
        subtitle: "THERMO FLUX",
        image: "/images/red-edition.png",
        description: "Thermogenic fat-burning matrix with capsicum extract.",
        accentColor: "#F59E0B",
        specs: [
            { label: "Thermogenic", value: "Capsi-Heat+" },
            { label: "Fat Oxidation", value: "+22% Rate" },
            { label: "Energy", value: "Lipid-Base" },
            { label: "Heat Level", value: "Phase 3" }
        ],
        longDescription: "Lava Amber ignites your internal furnace. By utilizing a proprietary encapsulation of red pepper extracts, it increases core temperature and speeds up fat oxidation without causing gastric distress. Perfect for those targeting lean physique and high heat performance.",
        gallery: ["/images/red-edition.png", "/images/gallery/br-3.png"],
        price: "$6.99",
        category: "Weight Mgmt"
    },
    {
        id: "aqua-neon",
        title: "AQUA NEON",
        subtitle: "CYBER HYDRATE",
        image: "/images/blue-edition.png",
        description: "UV-reactive electrolyte blend with synthetic-free neon glow.",
        accentColor: "#06B6D4",
        specs: [
            { label: "Luminescence", value: "Natural UV-R" },
            { label: "Hydration", value: "Cyber-Fluid 2.0" },
            { label: "Vitamins", value: "B-Complex Ultra" },
            { label: "Style", value: "Neon Aesthetic" }
        ],
        longDescription: "Aqua Neon is the future of social drinking. It's the world's first all-natural beverage that glows under blacklight, thanks to concentrated riboflavin and quinine extracts. Beyond the look, it's packed with a potent B-complex to keep your energy levels steady throughout the night.",
        gallery: ["/images/blue-edition.png", "/images/gallery/br-4.png"],
        price: "$8.99",
        category: "Social/Night"
    }
];
