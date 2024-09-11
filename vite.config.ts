import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"./runtimeConfig": "./runtimeConfig.browser",
		},
	},
	optimizeDeps: {
		include: ["gapi-script"],
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
});
