"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }) {
    const paths = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        d: `M-${280 - i * 5 * position} -${139 + i * 6}C-${
            280 - i * 5 * position
        } -${139 + i * 6} -${212 - i * 5 * position} ${116 - i * 6} ${
            152 - i * 5 * position
        } ${243 - i * 6}C${416 - i * 5 * position} ${370 - i * 6} ${
            484 - i * 5 * position
        } ${575 - i * 6} ${484 - i * 5 * position} ${575 - i * 6}`,
        color: `rgba(255, 255, 255, ${0.2 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none bg-[#030303]">
            <svg
                className="w-full h-full text-white"
                viewBox="0 0 496 216"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.3 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.8 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.4, 0.8, 0.4],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="fixed inset-0 bg-[#030303]">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
} 