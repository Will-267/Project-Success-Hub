import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-lora)'], // Example, ensure you load this font if you use it
      },
      colors: {
        amber: {
            '400': '#facc15',
            '500': '#f59e0b',
        },
        slate: {
            '50': '#f8fafc',
            '100': '#f1f5f9',
            '300': '#cbd5e1',
            '500': '#64748b',
            '600': '#475569',
            '800': '#1e293b',
            '900': '#0f172a',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
