import React, { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

interface ScrollStackProps {
    children: React.ReactNode;
    className?: string;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string | number;
    scaleEndPosition?: string | number;
    baseScale?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
}

export const ScrollStackItem = ({ children, itemClassName = '' }: { children: React.ReactNode, itemClassName?: string }) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = true,
    onStackComplete
}: ScrollStackProps) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const cachedOffsets = useRef<number[]>([]);
    const cachedEndElementTop = useRef(0);
    const lastTransformsRef = useRef<Map<number, { y: number, s: number }>>(new Map());
    const isUpdatingRef = useRef(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller?.scrollTop || 0,
                containerHeight: scroller?.clientHeight || 0
            };
        }
    }, [useWindowScroll]);

    const updateCachedValues = useCallback(() => {
        const { scrollTop } = getScrollData();

        cardsRef.current = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : scrollerRef.current?.querySelectorAll('.scroll-stack-card') || []
        ) as HTMLElement[];

        cachedOffsets.current = cardsRef.current.map(card => {
            if (!card) return 0;
            const rect = card.getBoundingClientRect();
            return rect.top + scrollTop;
        });

        const endElement = useWindowScroll
            ? document.querySelector('.scroll-stack-end')
            : scrollerRef.current?.querySelector('.scroll-stack-end');

        if (endElement) {
            const rect = endElement.getBoundingClientRect();
            cachedEndElementTop.current = rect.top + scrollTop;
        }
    }, [getScrollData, useWindowScroll]);

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
        const endElementTop = cachedEndElementTop.current;

        // Pre-calculate topCardIndex once per frame for blur effects
        let topCardIndex = 0;
        if (blurAmount) {
            for (let j = 0; j < cachedOffsets.current.length; j++) {
                const jTriggerStart = cachedOffsets.current[j] - stackPositionPx - (itemStackDistance * j);
                if (scrollTop >= jTriggerStart) topCardIndex = j;
            }
        }

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = cachedOffsets.current[i];
            if (cardTop === undefined) return;

            const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, cardTop - scaleEndPositionPx);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let translateY = 0;
            if (scrollTop >= triggerStart && scrollTop <= pinEnd) {
                translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
            }

            // Optimization: Round values to reduce sub-pixel rendering cost and DOM updates
            const activeTranslateY = Math.round(translateY * 2) / 2;
            const activeScale = Math.round(scale * 1000) / 1000;
            const activeRotation = Math.round(rotation * 10) / 10;

            const last = lastTransformsRef.current.get(i);
            const needsUpdate = !last || Math.abs(last.y - activeTranslateY) > 0.5 || Math.abs(last.s - activeScale) > 0.002;

            if (needsUpdate) {
                card.style.transform = `translate3d(0, ${activeTranslateY}px, 0) scale(${activeScale}) rotate(${activeRotation}deg)`;

                if (blurAmount) {
                    const blur = i < topCardIndex ? (topCardIndex - i) * blurAmount : 0;
                    const activeBlur = Math.round(blur * 10) / 10;
                    card.style.filter = activeBlur > 0 ? `blur(${activeBlur}px)` : 'none';
                }

                lastTransformsRef.current.set(i, { y: activeTranslateY, s: activeScale });
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= triggerStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [getScrollData, parsePercentage, stackPosition, scaleEndPosition, itemStackDistance, calculateProgress, baseScale, itemScale, rotationAmount, blurAmount, onStackComplete]);

    const setupLenis = useCallback(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            lerp: 0.1,
            // @ts-ignore
            wrapper: useWindowScroll ? window : scrollerRef.current,
            // @ts-ignore
            content: useWindowScroll ? document.documentElement : scrollerRef.current?.querySelector('.scroll-stack-inner'),
        });

        lenis.on('scroll', updateCardTransforms);

        const raf = (time: number) => {
            lenis.raf(time);
            animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);
        lenisRef.current = lenis;
    }, [useWindowScroll, updateCardTransforms]);

    useLayoutEffect(() => {
        updateCachedValues();

        cardsRef.current.forEach((card, i) => {
            if (i < cardsRef.current.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
        });

        setupLenis();
        updateCardTransforms();

        const handleResize = () => {
            updateCachedValues();
            updateCardTransforms();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (lenisRef.current) lenisRef.current.destroy();
            lastTransformsRef.current.clear();
        };
    }, [itemDistance, setupLenis, updateCachedValues, updateCardTransforms]);

    return (
        <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
            <div className="scroll-stack-inner">
                {children}
                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;
