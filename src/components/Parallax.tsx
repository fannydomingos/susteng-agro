"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  legenda?: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  /** intensidade do parallax em % da altura */
  forca?: number;
  objectPosition?: string;
};

/** Imagem grande com parallax vertical. A legenda obrigatória vai por baixo. */
export default function ParallaxImage({
  src,
  alt,
  legenda,
  className = "",
  sizes,
  priority = false,
  forca = 12,
  objectPosition = "center",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${forca}%`, `${forca}%`]);

  return (
    <figure className={className}>
      <div ref={ref} className="relative h-full w-full overflow-hidden rounded-marca">
        <motion.div
          className="absolute inset-0"
          style={reduzir ? undefined : { y, scale: 1 + forca / 100 + 0.04 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            quality={80}
            priority={priority}
            className="object-cover"
            style={{ objectPosition }}
          />
        </motion.div>
      </div>
      {legenda ? (
        <figcaption className="mt-2 text-legenda text-tinta-suave">{legenda}</figcaption>
      ) : null}
    </figure>
  );
}
