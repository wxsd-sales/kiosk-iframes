// import adapter from '@sveltejs/adapter-auto';
import adapter from "@sveltejs/adapter-static";
import preprocess from 'svelte-preprocess';

const dev = process.env.npm_lifecycle_event === "dev";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: "docs",
			assets: "docs",
			fallback: 'index.html'
		}),
		paths: {
 			base: dev ? "" : "/kiosk-iframes",
 		},
	}
};

export default config;