/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			width: {
				custom: "calc(50% - 1rem)",
			},
			width: {
				customCard: "calc(50% - 3rem)",
			},
		},
	},
	plugins: [],
};
