import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'obsidian': 'url("/Obsidian.jpg")',
      },
      colors: {
        'text': '#dee2f2',
        'background': '#030407',
        'primary': '#99a4d7',
        'secondary': '#763280',
        'accent': '#c467b1',
       },       
    },
  },
  plugins: [],
}
export default config
