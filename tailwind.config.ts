
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		screens: {
			'xs': '480px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				gold: {
					'50': '#fbf8e9',
					'100': '#f7efd0',
					'200': '#eedd9a',
					'300': '#e2c359',
					'400': '#d8af32',
					'500': '#c7952c',
					'600': '#a97224',
					'700': '#855420',
					'800': '#714420',
					'900': '#623a21',
				},
				brown: {
					'50': '#f8f6f4',
					'100': '#f0ebe5',
					'200': '#e1d3c7',
					'300': '#ccb39e',
					'400': '#b38f73',
					'500': '#a17558',
					'600': '#8e6248',
					'700': '#76503c',
					'800': '#624335',
					'900': '#523831',
				},
				// Nuevos colores para el diseño moderno
				neon: {
					'pink': '#ff719A',
					'purple': '#9B5DE5',
					'blue': '#00C2FF',
					'cyan': '#04E1FF',
					'green': '#00F5A0',
					'yellow': '#FFF338',
					'orange': '#FF9E00',
					'red': '#FF4E50',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'glow': {
					'0%, 100%': { 
						'box-shadow': '0 0 20px rgba(255, 113, 154, 0.5), 0 0 30px rgba(0, 194, 255, 0.3)'
					},
					'50%': { 
						'box-shadow': '0 0 30px rgba(255, 113, 154, 0.8), 0 0 40px rgba(0, 194, 255, 0.5)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-gold': 'linear-gradient(90deg, rgba(216, 175, 50, 1) 0%, rgba(169, 114, 36, 1) 100%)',
				'gradient-neon': 'linear-gradient(90deg, rgba(255, 113, 154, 1) 0%, rgba(0, 194, 255, 1) 100%)',
				'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'dark-gradient': 'radial-gradient(ellipse at center, rgba(15, 15, 25, 1) 0%, rgba(5, 5, 10, 1) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
