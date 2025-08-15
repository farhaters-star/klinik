import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
       fontFamily: {
        funky: ["'Bungee Spice'", "cursive"], // ← nama bebas
      },
      keyframes: {
        wiggleX: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%":      { transform: "translateX(12px)" },   // geser kanan
        },
      },
      animation: {
        "wiggle-x": "wiggleX 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui:{
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
    ]
  }

}
