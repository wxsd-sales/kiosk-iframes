import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	envPrefix: 'PUBLIC',
		css: {
			devSourcemap: true
		}
};

export default config;
