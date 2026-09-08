import localFont from "next/font/local";

/** Fontes auto-hospedadas em src/fonts, nenhuma requisição ao Google Fonts em runtime. */

export const poppins = localFont({
  src: [
    { path: "../fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/poppins-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const inter = localFont({
  src: [
    { path: "../fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
